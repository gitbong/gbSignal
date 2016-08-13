###*
# Created by gitbong on 8/13/16.
# github:gitbong
###

class Signal
	map: []
	constructor: ->
		@map = []

	add: (fn, scope = window)->
		@map.push(
			fn: fn
			scope: scope
			addOnce: false,
			destroy: false
		)
	addOnce: (fn, scope = window) ->
		@map.push(
			fn: fn
			scope: scope
			addOnce: true,
			destroy: false
		)
	remove: (fn) ->
		for i of @map
			if @map[i].fn is fn
				@map.splice(i, 1)
				@remove(fn)

	dispatch: ->
		for obj in @map
			fn = obj.fn
			scope = obj.scope
			addOnce = obj.addOnce
			destroy = obj.destroy

			if !destroy
				fn.apply scope, arguments
			if addOnce
				obj.destroy = true
		return

window.gbSignal = Signal