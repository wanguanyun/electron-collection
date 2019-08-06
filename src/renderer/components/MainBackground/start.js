/**
    Author: Damian Drygiel
    WWW:    http://drygiel.com
*/
import * as THREE from 'three'

function Waves(cvs, options) {
  var self = this,
    paused = true,
    rafid

  self.isOK = false

  self.defaults = {
    accuracy: 1,
    speed: 0.16,
    offset: 246,
    height: 30,
    color: 0xFFFFFF,
    bgColor: 0xFFFFFF,
    size: 1000,
    segments: 40,
    camera: {
      perspective: -70,
      position: {
        x: 450,
        y: 40,
        z: 0
      },
      lookAt: {
        x: 0,
        y: 140,
        z: 50
      }
    },
    fog: {
      enabled: true,
      density: 0.005
    },
    renderCallback: function(s) {}
  }

  self.isPaused = function() {
    return paused
  }
  self.dots = []

  function extend(destination, source) {
    for (var property in source) {
      if (typeof source[property] === 'object') { destination[property] = extend(destination[property], source[property]) } else { destination[property] = source[property] }
    }
    return destination
  }

  function addEvent(elem, type, eventHandle) {
    if (elem == null || elem == undefined) return
    if (elem.addEventListener) {
      elem.addEventListener(type, eventHandle, false)
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, eventHandle)
    } else {
      elem['on' + type] = eventHandle
    }
  }

  function getDevicePixelRatio() {
    var ratio = 1
    // To account for zoom, change to use deviceXDPI instead of systemXDPI
    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
      // Only allow for values > 1
      ratio = window.screen.systemXDPI / window.screen.logicalXDPI
    } else if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio
    }
    return ratio
  }

  function OnResizeCVS() {
    var pixelRatio = 1 / getDevicePixelRatio()
    self.camera.aspect = window.innerWidth / window.innerHeight
    self.camera.updateProjectionMatrix()
    self.renderer.setSize(window.innerWidth * pixelRatio * self.options.accuracy, window.innerHeight * pixelRatio * self.options.accuracy, false)
  }

  function init() {
    self.options = extend(self.defaults, options)

    if (!window.WebGLRenderingContext) return false

    try {
      self.renderer = new THREE.WebGLRenderer({
        canvas: cvs,
        antialias: true
      })
      self.renderer.setClearColor(self.options.bgColor)
      // SCENE
      self.scene = new THREE.Scene()

      if (self.options.fog.enabled) { self.scene.fog = new THREE.FogExp2(self.options.bgColor, self.options.fog.density) }

      // CAMERA
      self.camera = new THREE.PerspectiveCamera(self.options.camera.perspective, window.innerWidth / window.innerHeight, 1, 10000)
      self.camera.position.set(self.options.camera.position.x, self.options.camera.position.y, self.options.camera.position.z)
      self.lookAt = new THREE.Vector3(self.options.camera.lookAt.x, self.options.camera.lookAt.y, self.options.camera.lookAt.z)
      self.camera.lookAt(self.lookAt)
      self.scene.add(self.camera)

      // ON WINDOW RESIZE
      addEvent(window, 'resize', OnResizeCVS)
      OnResizeCVS()

      // PLANE
      var material = new THREE.MeshBasicMaterial({
        color: self.options.color,
        wireframe: true
      })
      var geometry = new THREE.PlaneGeometry(self.options.size, self.options.size * 2, self.options.segments, self.options.segments * 2)

      self.mesh = new THREE.Mesh(geometry, material)
      self.mesh.rotation.x = Math.PI / 2
      self.scene.add(self.mesh)
    } catch (e) {
      return false
    }
    return true
  }
  self.isOK = init()

  function animate() {
    rafid = requestAnimationFrame(animate)
    waves(Date.now() / 1000)
    self.options.renderCallback(self)
    self.renderer.render(self.scene, self.camera)
  }

  function waves(time) {
    var verts = self.mesh.geometry.vertices

    for (var i = 0, len = verts.length; i < len; i++) {
      verts[i].z = Math.sin(verts[i].x * Math.PI / self.options.offset + time * self.options.speed) *
                Math.cos(verts[i].y * Math.PI / self.options.offset + time * self.options.speed) *
                self.options.height
    }

    self.mesh.geometry.verticesNeedUpdate = true
  }

  self.toggle = function(run) {
    if (!self.isOK) return false

    if (run === undefined) { self.toggle(!paused) } else if (!!run && paused) {
      paused = false
      animate()
    } else if (!run) {
      paused = true
      cancelAnimationFrame(rafid)
    }
    return true
  }
}
export function render() {
  var cvs = document.getElementById('cvs')
  var mouseX = 0
  document.onmousemove = function(e) {
    mouseX = e.clientX
  }

  var waves = new Waves(cvs, {
    color: 0xBBBBBB,
    renderCallback: function(v) {
      var targetX = mouseX / window.innerWidth * 200 - 100
      v.lookAt.z += (-targetX - v.lookAt.z) / 100
      v.camera.lookAt(v.lookAt)
    }
  })

  waves.toggle(true)
}
