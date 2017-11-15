var Generator = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    //初始化阶段
    initializing() {
        console.log('>>>initializing...');
        if(!this.options['skip-welcome-message']) {
            this.log(require('yeoman-welcome'));
            this.log('This generator will generator a Vue.js project for you, including webpack work flow and some default Vue components and tools.\n');
        }
        this.props = {};
    }

    //接受用户输入的阶段
    prompting() {
        console.log('>>>prompting...');
        var done = this.async();

        this.log(
            yosay(
                'Welcome to the ' +
                chalk.red('generator-enjoy-vue') +
                ' generator!'
            )
        );

        var execSync = require('child_process').execSync;
        var execSyncGitCommand = function(gitCommand){
            var result = execSync(gitCommand, {encoding: 'utf-8'}).trim();
            return result;
        }
        var author = this.user.git.name();
        var email = this.user.git.email();

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'Project name (' + this.appname + '):',
                default: this.appname
            },
            {
                type: 'input',
                name: 'projectVersion',
                message: 'Project version (1.0.0):',
                default: '1.0.0'
            },
            {
                type: 'input',
                name: 'projectDesc',
                message: 'Project description:',
                default: ''
            },
            {
                type: 'input',
                name: 'projectMain',
                message: 'Project Main file (src/pages/index/app.js):',
                default: 'src/pages/index/app.js'
            },
            {
                type: 'input',
                name: 'projectAuthor',
                message: 'Author Name(' + author + '):',
                default: author
            },
            {
                type: 'input',
                name: 'projectEmail',
                message: 'Author Email(' + email + '):',
                default: email
            },
            {
                type: 'list',
                name: 'projectLicense',
                message: 'License:',
                choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
            },
            {
                type: 'input',
                name: 'projectHost',
                message: 'Host of your pages:',
                default: 'm.test.com'
            },
            {
                type: 'input',
                name: 'projectStaticHost',
                message: 'Host of your static resources:',
                default: 'static.test.com'
            },
            {
                type: 'input',
                name: 'projectAPIHost',
                message: 'Host of the backend APIs:',
                default: 'api.test.com'
            }
        ];


        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            props.projectCwd = process.cwd();
            this.props = props;
            // To access props later use this.props.someOption;
            done();
        });
    }

    //保存配置信息和文件，如.editorconfig
    configuring(){
        console.log('>>>configuring...');
    }

    //非特定的功能函数名称
    defaults() {
        console.log('>>>defaults...');
        if (path.basename(this.destinationPath()) !== this.props.projectName) {
            this.log(
              'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
              'We\'ll automatically create this folder for you.'
            );
            mkdirp(this.props.projectName);
            console.log(111111111, this.destinationPath(this.props.projectName))
            console.log(22222222, this.destinationRoot(this.destinationPath(this.props.projectName)))
            console.log(33333333, this.templatePath('./'));
            console.log(33333333, this.templatePath('./src'));
            this.destinationRoot(this.destinationPath(this.props.projectName));
        }
    }

    //声称项目目录结构阶段
    writing() {
        console.log('>>>writing...');
        this._copyTpl('_babelrc', '.babelrc')
        this._copyTpl('_editorconfig', '.editorconfig')
        this._copyTpl('_eslintignore', '.eslintignore')
        this._copyTpl('_eslintrc.js', '.eslintrc.js')
        this._copyTpl('_gitignore', '.gitignore')
        this._copyTpl('_package.json', 'package.json')
        this._copyTpl('_postcssrc.js', '.postcssrc.js')
        this._copyTpl('_README.md', 'README.md')
        this._copyTpl('_reset.sh', 'reset.sh')

        this._copyTpl('./config/common-lib-dependencies.js', './config/common-lib-dependencies.js')
        this._copyTpl('./config/dev.env.js', './config/dev.env.js')
        this._copyTpl('./config/index.js', './config/index.js')
        this._copyTpl('./config/postcss.config.js', './config/postcss.config.js')
        this._copyTpl('./config/prod.env.js', './config/prod.env.js')
        this._copyTpl('./config/test.env.js', './config/test.env.js')

        this._copyTpl('./build', './build')
        this._copyTpl('./httpscertificate', './httpscertificate')
        this._copyTpl('./src', './src')
        // this._copyTpl('./static', './static')
        this._copyTpl('./test', './test')
    }

    //统一处理冲突，如要生成的文件已经存在是否覆盖等处理
    conflicts(){
        console.log('>>>conflicts...')
    }

    //安装依赖阶段，如通过npm、bower
    install() {
        console.log('>>>install...');
        this.installDependencies({
            npm: true,
            bower: false,
            yarn: false
        });
    }

    //生成器即将结束
    end(){
        console.log('>>>end...');
    }
    
    _copy(from, to) {
        this.fs.copy(this.templatePath(from), this.destinationPath(to))
    }

    _copyTpl(from, to) {
        //注意这里的第三个参数是要传入的那些变量，而不是传this
        this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props) 
    }
};
