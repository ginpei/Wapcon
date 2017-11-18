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
 *   SettingTable(heading="Database")
 *     SettingColumn(title="Path")
 *       SettingInput(:value="$store.state.preferences.databasePath" readonly)
 *     SettingColumn(title="Reset")
 *       GIconButton(icon="exclamation-triangle") Delete all
 */

const SettingColumn = require('./SettingColumn.vue')
const SettingInput = require('./SettingInput.vue')
const SettingLayout = require('./SettingLayout.vue')
const SettingTable = require('./SettingTable.vue')

module.exports = {
	SettingColumn,
	SettingInput,
	SettingLayout,
	SettingTable,
}
