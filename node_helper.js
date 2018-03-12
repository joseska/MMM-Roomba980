/* Magic Mirror
 * Node Helper: MMM-Xiaomi-Vacuum
 *
 * By Jose M. Luis
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const request = require('request');
<<<<<<< HEAD
const miio = require('miio');
=======
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e

const REQUIRED_FIELDS = ['vacuumName'];
// const ROOMBA_STATS = ['bin', 'name', 'batPct', 'cleanMissionStatus'];

module.exports = NodeHelper.create({
	start: function() {
		const self = this;

		self.started = false;
		self.config = [];
		self.stats = {};
	},

	socketNotificationReceived: function(notification, payload) {
		const self = this;

		switch (notification) {
			case 'START':
				self.handleStartNotification(payload);

		}
	},

	handleStartNotification: function(payload) {
		const self = this;

		if (self.started) {
			return;
		}

		self.config = payload;

		if (self.isInvalidConfig()) {
			return;
		}

		self.scheduleUpdates();

		self.started = true;
	},

	updateStats: function () {
		const self = this;

<<<<<<< HEAD
		var url11 = 'http://192.168.1.99:1880/rumbita';

		request.get({
			url: url11,
=======
		var url = 'http://192.168.1.99:1880/rumbita';

		request.get({
			url: url,
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e
			json: true,
			headers: { 'User-Agent': 'request' }
		}, (err, res, data) => {
			if (err) {
				console.log('Error:', err);
			} else if (res.statusCode !== 200) {
				console.log('Status:', res.statusCode);
			} else {
				// data is already parsed as JSON:
<<<<<<< HEAD

=======
				console.log(data.State);
				console.log(data.Battery);
				console.log(data.FanSpeed);
				console.log(self.config.vacuumName);
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e

				Object.assign(self.stats, {
					name: self.config.vacuumName,
					binFull: data.FanSpeed,
					batteryPercent: data.Battery,
<<<<<<< HEAD
					phase: data.State
				});

				self.sendSocketNotification('STATS', self.stats);


			}

		});


=======
					phase: data.State,
				});
			}
		});
		
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e
	},


	isInvalidConfig: function() {
		const self = this;

		let missingField = REQUIRED_FIELDS.find((field) => {
			return !self.config[field];
		});

		if (missingField) {
			self.sendSocketNotification(
				'ERROR',
				`<i>Confg.${missingField}</i> is required for module: ${self.name}.`
			);
		}

		return !!missingField;
	},

	scheduleUpdates() {
		const self = this;

		self.updateStats();
		setInterval(function() {
			self.updateStats();
		}, self.config.updateInterval);
	},
});
