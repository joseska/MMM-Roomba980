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
		updateInterval: 60 * 1000, // 1 miniute
		animationSpeed: 2 * 1000, // 2 seconds
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
		wrapper.className = 'small';
		wrapper.innerHTML = `
			<tr>
				${self.renderName()}
				${self.renderPhase()}
				${self.renderBinStatus()}
				${self.renderBatteryStatus()}
			</tr>
		`;

		return wrapper;
	},

	renderName() {
		return `<td class="name">${this.stats.name}</td>`;
	},

	renderName() {
		return `<td class="name">${this.stats.phase}</td>`;
	},

	renderPhase2() {
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
				phaseText = self.translate('PAUSED');
				break;
			case 'Charger disconnected':
				phaseText = self.translate('PAUSED');
				break;
			default:
				phaseText = `${self.translate('UNKNOWN')}: ${self.stats.phase}`;
		}

		return `<td class="phase title bright">${phaseText}</td>`;
	},

	renderBinStatus2() {
		const self = this;

		let statusHtml = '';
		if (self.stats.binFull) {
			statusHtml = `
				<td class="bin title bright">
					<i class="fa fa-trash"></i> ${self.translate('FULL')}
				</td>
			`;
		}

		return statusHtml;
	},

	renderBinStatus() {
		return `
			<td class="battery">
				<i class="fa fa-bolt"></i> ${this.stats.binFull}
			</td>`;
	},

	renderBatteryStatus() {
		return `
			<td class="battery">
				<i class="fa fa-bolt"></i> ${this.stats.batteryPercent}%
			</td>`;
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
