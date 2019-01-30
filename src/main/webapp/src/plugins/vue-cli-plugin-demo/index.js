module.exports = (api, projectOptions) => {
    api.registerCommand('demo', {
        description: 'demo plugin for vue cli 3',
        usage: 'vue-cli-service demo',
        options: {}
    }, (args) => {
        let options = projectOptions.pluginOptions.demoOptions
        console.log('options', options)
    })
}