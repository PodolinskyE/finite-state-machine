class FSM {
	/**
	 * Creates new FSM instance.
	 * @param config
	 */
	constructor(config) {
		this.initial = config.initial;
		//this.state = config.initial;
		this.uhistory = [];
		this.rhistory = [];
		this.state = this.initial;
		this.states = config.states;
	}

	/**
	 * Returns active state.
	 * @returns {String}
	 */
	getState() {
		return this.state;
	}

	Exception(msg) {
		var message = msg;
		var name = "Exception";
	}

	/**
	 * Goes to specified state.
	 * @param state
	 */
	changeState(state) {
		if (this.states[state]) {
			this.uhistory.push(this.state);
			this.rhistory = [];
			this.state = state;
		}
		else throw Exception('Error');
	}

	/**
	 * Changes state according to event transition rules.
	 * @param event
	 */
	trigger(event) {
		var newState = this.states[this.state].transitions[event];
		if (newState) {
			this.uhistory.push(this.state);
			this.rhistory = [];
			this.state = newState;
		}
		else throw Exception('Error');
	}

	/**
	 * Resets FSM state to initial.
	 */
	reset() {
		this.state = this.initial;
	}

	/**
	 * Returns an array of states for which there are specified event transition rules.
	 * Returns all states if argument is undefined.
	 * @param event
	 * @returns {Array}
	 */
	getStates(event) {
		var states = this.states[this.state].transitions;
		
		if (!event || event == undefined) {
			var res = [];
			for (var key in this.states) res.push(key);
			return res;
		} else {
			var res = [];
			for (var key in this.states) {
				if (event in this.states[key].transitions)
				res.push(key);
			}
			return res;
		}
	}

	/**
	 * Goes back to previous state.
	 * Returns false if undo is not available.
	 * @returns {Boolean}
	 */
	undo() {
		var prev = this.uhistory.pop();
		if (prev) {
			this.rhistory.push(this.state);
			this.state = prev;
			return true;
		} else return false;
	}

	/**
	 * Goes redo to state.
	 * Returns false if redo is not available.
	 * @returns {Boolean}
	 */
	redo() {
		var next = this.rhistory.pop();
		if (next) {
			this.uhistory.push(this.state);
			this.state = next;
			return true;
		} else return false;
	}

	/**
	 * Clears transition history
	 */
	clearHistory() {
		this.uhistory = [];
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
