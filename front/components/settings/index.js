/**
 * @example
 * <!--
 * const {
 *   SettingHeading,
 *   SettingInput,
 *   SettingLayout,
 *   SettingTable,
 * } = require('../../components/settings/index.js')
 * -->
 *
 * @example
 * SettingLayout(title="Preferences")
 *   section
 *     SettingHeading Database
 *     SettingTable
 *       tr
 *         th Path
 *         td
 *           SettingInput(:value="$store.state.preferences.databasePath" readonly)
 *       tr
 *         th Reset
 *         td
 *           GIconButton(icon="exclamation-triangle") Delete all
 */

const SettingHeading = require('./SettingHeading.vue')
const SettingInput = require('./SettingInput.vue')
const SettingLayout = require('./SettingLayout.vue')
const SettingTable = require('./SettingTable.vue')

module.exports = {
	SettingHeading,
	SettingInput,
	SettingLayout,
	SettingTable,
}
