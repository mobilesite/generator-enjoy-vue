var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    initializing() {
        this.props = {};
        this.pkg = require('../../package.json');
    }

    prompting() {
        var done = this.async();

        this.log(
            yosay(
                'Welcome to the ' +
                chalk.red('generator-enjoy-vue') +
                ' generator!'
            )
        );

        var folderName = path.basename(process.cwd());
        var execSync = require('child_process').execSync;
        var execSyncGitCommand = function(gitCommand){
            var result = execSync(gitCommand, {encoding: 'utf-8'}).trim();
            return result;
        }
        var username = execSyncGitCommand('git config user.name');
        var useremail = execSyncGitCommand('git config user.email');
        var author = username + '<' + useremail + '>';

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'Please input project name (' + this.appname || folderName + '):',
                default: this.appname || folderName
            },
            {
                type: 'input',
                name: 'projectDesc',
                message: 'Please input project description:'
            },
            {
                type: 'input',
                name: 'projectMain',
                message: 'Main file (app.js):',
                default: 'app.js'
            },
            {
                type: 'input',
                name: 'projectAuthor',
                message: 'Author(' + author + '):',
                default: author
            },
            {
                type: 'list',
                name: 'projectLicense',
                message: 'Please choose license:',
                choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
            }
        ];

        this.prompt(
            prompts,
            function(props) {
                this.props = props;
                // To access props later use this.props.someOption;
                done();
            }.bind(this)
        );
    }

    writing() {
        this._copyTpl('_package.json', 'package.json')
        this._copyTpl('_index.html', 'index.html')
        this._copyTpl('_main.js', './src/main.js')
        this._copyTpl('_app.vue', './src/app.vue')
        this._copyTpl('_styles.css', './src/styles.css')
        this._copyTpl('_webpack.config.js', 'webpack.config.js')
        this._copyTpl('_webpack.production.js', 'webpack.production.js')
        this._copy('_gitignore', '.gitignore')
        this._copy('_babelrc', '.babelrc')
        this._copy('_eslintrc', '.eslintrc')
        this._copy('_editorconfig', '.editorconfig')
      }
    
    _copy(from, to) {
        this.fs.copy(this.templatePath(from), this.destinationPath(to))
    }

    _copyTpl(from, to) {
        this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this)
    }
};
