/* global Module */

/* Magic Mirror
 * Module: MMM-Xiaomi-Vacuum
 *
 * By Jose M. Luis
 * MIT Licensed.
 */

Module.register('MMM-Xiaomi-Vacuum', {
	defaults: {
		vacuumName: '',
<<<<<<< HEAD:MMM-Xiaomi-Vacuum.js
		updateInterval: 60 * 1000, // 1 minutos
		animationSpeed: 2 * 1000, // 2 segundos
=======
		updateInterval: 60 * 1000, // 1 miniute
		animationSpeed: 2 * 1000, // 2 seconds
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e:MMM-Xiaomi-Vacuum.js
	},

	requiresVersion: '2.1.0',

	start() {
		const self = this;

		self.loaded = false;
		self.stats = {};

		self.sendSocketNotification('START', self.config);
		Log.info('Starting module: ' + self.name);
	},

	getDom() {
		const self = this;

		if (self.error) {
			return self.renderError();
		}

		if (!self.loaded) {
			return self.renderLoading();
		}

		return self.renderStats();
	},


	socketNotificationReceived(notification, payload) {
		const self = this;

		switch (notification) {
			case 'STATS':
				self.loaded = true;
				self.stats = payload;
				break;
			case 'ERROR':
				self.error = payload;
				break;
		}

		this.updateDom(self.config.animationSpeed);
	},


	renderError() {
		const self = this;

		let wrapper = document.createElement('div');
		wrapper.className = 'dimmed light small';
		wrapper.innerHTML = self.error;
		return wrapper;
	},

	renderLoading() {
		const self = this;

		let wrapper = document.createElement('div');
		wrapper.className = 'dimmed light small';
		wrapper.innerHTML = self.translate('LOADING');

		return wrapper;
	},

	renderStats() {
		const self = this;

		let wrapper = document.createElement('table');
		wrapper.className = 'xsmall';
		wrapper.innerHTML = `
			<tr>
				${self.renderPhase()}
				${self.renderBinStatus()}
				${self.renderBatteryStatus2()}
			</tr>
		`;

		return wrapper;
	},

<<<<<<< HEAD:MMM-Xiaomi-Vacuum.js
	renderPhase() {
=======
	renderName() {
		return `<td class="name">${this.stats.name}</td>`;
	},

	renderName() {
		return `<td class="name">${this.stats.phase}</td>`;
	},

	renderPhase2() {
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e:MMM-Xiaomi-Vacuum.js
		const self = this;

		let phaseText;
		switch (self.stats.phase) {
			case 'Charging':
				phaseText = self.translate('CHARGING');
				break;
			case 'Returning home':
				phaseText = self.translate('RETURNING_HOME');
				break;
			case 'Cleaning':
				phaseText = self.translate('CLEANING');
				break;
			case 'stop':
				phaseText = self.translate('STOP');
				break;
			case 'Paused':
				phaseText = self.translate('PAUSED');
				break;
			case 'Charger disconnected':
<<<<<<< HEAD:MMM-Xiaomi-Vacuum.js
				phaseText = self.translate('CHARGER DISCONNECTED');
=======
				phaseText = self.translate('PAUSED');
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e:MMM-Xiaomi-Vacuum.js
				break;
			default:
				phaseText = `${self.translate('UNKNOWN')}: ${self.stats.phase}`;
		}

		return `<td class="normal light small">${phaseText}</td>`;
	},

<<<<<<< HEAD:MMM-Xiaomi-Vacuum.js
	renderBinStatus() {
		return `
			<td class="battery">
				<i class="fa fa-superpowers xm-icon"></i> ${this.stats.binFull}%
			</td>`;
	},
=======
	renderBinStatus2() {
		const self = this;
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e:MMM-Xiaomi-Vacuum.js

	// renderBatteryStatus() {
	// 	return `
	// 		<td class="battery">
	// 			<i class="fa fa-plug"></i> ${this.stats.batteryPercent}%
	// 		</td>`;
	// },

	renderBatteryStatus2() {
		if (this.stats.phase == 'Charging') {
			bateria_icono = "fa fa-plug xm-icon";
		}
		else if (this.stats.phase != 'Charging' && this.stats.batteryPercent > 90) {
			bateria_icono = "fa fa-battery-full xm-icon";
		}
		else if (this.stats.phase != 'Charging' && this.stats.batteryPercent < 90 && this.stats.batteryPercent > 60) {
			bateria_icono = "fa fa-battery-three-quarters xm-icon";
		}
		else if (this.stats.phase != 'Charging' && this.stats.batteryPercent < 60 && this.stats.batteryPercent > 40) {
			bateria_icono = "fa fa-battery-half xm-icon";
		}
		else if (this.stats.phase != 'Charging' && this.stats.batteryPercent < 40 && this.stats.batteryPercent > 15) {
			bateria_icono = "fa fa-battery-quarter xm-icon";
		}
		else if (this.stats.phase != 'Charging' && this.stats.batteryPercent < 15) {
			bateria_icono = "fa fa-battery-empty xm-icon";
		}
		else { 
			bateria_icono = "fa fa-plug xm-icon";
		}

<<<<<<< HEAD:MMM-Xiaomi-Vacuum.js
=======
	renderBinStatus() {
		return `
			<td class="battery">
				<i class="fa fa-bolt"></i> ${this.stats.binFull}
			</td>`;
	},

	renderBatteryStatus() {
>>>>>>> 03ef7450cc8429697ef4039ba97c4894c634027e:MMM-Xiaomi-Vacuum.js
		return `
			<td class="battery">
				<i class="${bateria_icono}"></i> ${this.stats.batteryPercent}%
			</td>`;
	},




	getScripts() {
		return [];
	},

	getStyles() {
		return [
			'MMM-Xiaomi-Vacuum.css',
			'font-awesome.css',
		];
	},

	getTranslations() {
		return {
			en: 'translations/en.json',
			es: 'translations/es.json'
		};
	},
});
