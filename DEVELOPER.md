= Tangential Developer Docs

## Getting started

This project was bootstrapped from the combination of the Angular Material 2 and an Angular2-cli created project. The build system and file layout in particular are inherited from the [Angular Material2](https://github.com/angular/material2) project. 

To start hacking, perform a clone-install-build:

```bash
> git clone git@github.com:ggranum/tangential.git
> cd tangential
> npm install
> firebase init
# Copy your firebase admin cert to {projectRoot}/firebase.service-account-key.local.json
# See https://console.firebase.google.com/project/${youProjectName}/settings/serviceaccounts/adminsdk
> npm run firebase.init-project
> npm run firebase.init-database
> npm run serve

```



## Project structure

### That which you must Do First  

1) Clone the repo: `git clone git@github.com:ggranum/tangential.git` 
1) `npm install`

Cloning the repository provides the code and scripts, but you'll need to prepare the environment. 

If you're developing with the intention of pushing code back to the Tangential project (Thanks!), or simply hacking on the code to gain experience with the model, 'preparing the environment' just means creating and initializing a Firebase repository of your own. 

If you are using this project as a bootstrap for your own "component library" project, you have options. Specifically, if you don't care if your widgets are available via NPM (e.g. 'npm install @myshinystuff/unicorns'), then you are also able to get going with just a Firebase project to call your own. Woohoo! If you want to distribute your components via NPM however, you'll need to create that account.
      
#### Firebase!

If you haven't signed up to Firebase yet, [do so](https://firebase.google.com/). Then navigate to your console at [https://console.firebase.google.com/](). Hit 'Create Project', provide a cool name (hereafter '${projectName}') and hit enter.

*(Note: If you're reading this file in an editor, you can simplify the links by doing a global search-and-destroy on '${projectName}', replacing it with your actual project name. Then you can actually follow links without modification.)*

After some wait-spinner action you should be dropped into your project page. Now, your project name won't _really_ be exactly what you typed. Firebase appends a unique token to it. This is so that we can all have our own _Phoenix_ project one day. For many things you'll be able to use the name you typed, but just remember that for everything important, you'll need your REAL project name. It's pretty easy to spot - just look at the URL you were directed to when your project was created. It should look like:  [https://console.firebase.google.com/project/${projectName}/overview]()

You will also need to enable email/password authentication. Do so here: [https://console.firebase.google.com/project/${projectName}/authentication/providers]()

With your project created, you now need to initialize firebase in your development project directory. First, from your project root, run the `firebase` command. 
  
```bash 
> firebase
Usage: firebase [options] [command]
...

```  

If you get 'command not found' or your OS equivalent, then you either need to install the Firebase Tools globally or set up an alias to your local node_modules.  

With the Firebase Tools successfully installed, run `firebase init`:
 
```bash
> firebase init
```

Firebase Tools will ask you which features to setup. Select both 'Database' and 'Hosting' and hit enter to continue.

Firebase will then ask you to select a default project. Choose the one you created above.

Next, firebase will prompt you with 'What file should be used for Database Rules? (database.rules.json)'. Do **NOT** choose the default. Enter 'firebase.rules.json' instead, and hit enter. Now choose 'N' for NO, do not overwrite the file (it's default, so just hit enter).

Choose the default ('public') for your public directory, and then choose '(Y)es' for 'Configure as a single-page app'.  It should then write your configuration to two files: 'firebase.json' and '.firebaserc'. The first file is part of the project (committed to git); it should not show any differences, and unless you really know what your doing, it never change. The `.firebaserc` file is ignored, and contains your firebase project name.
 
Now push your firebase rules (and a stub for your firebase hosting) by running:

```bash
> firebase deploy
```

You can see your site at the URL that the command writes to the console. You can also check out your database rules by following the 'Project Console' link and clicking on 'Database' (in the left navigation pane) followed by clicking on the 'Rules' tab. The link is [https://console.firebase.google.com/project/${projectName}/database/rules]()
 
 


##### Firebase API and Cert files

The project build scripts need access to your firebase project to work. Also, the project itself relies on some files that are not committed because of their private, or at least 'local' nature. Like `.firebaserc`. Or your project's default user credentials(!!). 

Fortunately, there's a gulp script to help you create these local files. The script uses the Firebase Admin api, which requires a 'service account key' - a security certification token. This token needs to be stored in a file called 'firebase.service-account-key.local.json', at the project root. If you run: 

```bash
> npm run firebase.init-project
```

a stub version of the file will be created for you. Populate this file by navigating to the link written to the command line, which should look like [https://console.firebase.google.com/project/${projectName}/settings/serviceaccounts/adminsdk](), but will have the correct project name already populated.
 
 Once you've created your service key and pasted it into the firebase.service-account-key.local.json file, run the init command again:
 
```bash
> npm run firebase.init-project
```
 
You will be prompted for your Firebase API Key, which can be found at [https://console.firebase.google.com/project/${projectName}/settings/general/]() (again, the script will write the real url to the console). You will need to click the 'Add Firebase to your Web App' button and copy the value from the popup.

You will also be prompted to provide some email addresses for any users configured in the ${projectRoot}/config/authorization-service/basic-defaults/users.json file. Which, at the time of writing, is just three users. 

If you have a Gmail account, it can be convenient to use the '~' feature that Gmail offers: you can create 'sub-addresses' using your normal Gmail email address but adding '~anything' between your username and the '@gmail.com'. So, 'My.Gmail~administrator@gmail.com'. These addresses are all valid and all drop straight into your normal inbox.  

So that's your firebase project fiels configuration done! You should now have a number of local files:


- [x] ${projectRoot}/.firebaserc
  * Configures your default firebase project by name.
- [x] ${projectRoot}/firebase.service-account-key.local.json
  * For access via the Firebase Admin API
- [x] ${projectRoot}/src/lib/authorization-service/config/firebase-config.local.ts
  * Holds your Firebase API key and connection information in a convenient, importable, TypeScript constant.  
- [x] ${projectRoot}/src/lib/authorization-service/config/users.local.json
  * Users configured as JSON, for consumption by bash scripts
- [X] ${projectRoot}/src/lib/authorization-service/config/users.local.ts
  * Users configured as an importable TypeScript constant, for consumption by code.
  
  
##### Push the initial database to Firebase
  
The initial rules and permissions that you'll need in order to get started currently live in a JSON file stored at ${projectRoot}/config/authorization-service/basic-defaults/auth-data-structure.json. Let's push that content up to our Firebase repo. This part is easy: just run 

```bash
> npm run firebase.init-database
```

This script will initialize your actual firebase users and database - the remote data, as opposed to initializing the local files as the `init-project' script did. 

Once the script completes, which should be within a few seconds, go take a look at your data that's now live in your firebase project: [https://console.firebase.google.com/project/${projectName}/database/data]()
 


### Build

The build system is really two build systems. Because Webpack isn't great at creating packages (at least when used via Angular-CLI), there is one build path for building out the modularized widget/component packages that are deployed to npm (one per folder under 'lib', at least as the project is currently configured.), and there is another build system for running the demo and the unit tests.
 
Gulp, plus a lot custom build code from the Material Design team, make up the former build system, while Angular CLI handles running the demo and the tests.
  
The main commands for building as a developer will be `npm run serve` and `npm run test` (if you have angular-cli installed globally, you can call `ng serve` and `ng test` directly - see the scripts block in package.json). Both of these tasks will watch for changes. The `serve` task hosts a server at [http://localhost:4200]()

Before submitting a pull request you should verify that you can build using `npm run build`, but other than for that verification step, component developers won't typically need to run the gulp based builds. That's the publisher's main tool.

Publishers will run a couple of tasks - which are explained in more detail later in this file. Obviously running the tests via `npm run test` is a good step in the plan. And even verifying that the demo works via `npm run serve`. Once all that good stuff checks out the Publisher will run the `npm run build` task, followed by the `npm run versionBump` task. Manual inspection of console output and changes made to the submodules' package.json version numbers is next, followed by a commit, generating change logs and some npm publish steps. Again, detailed, step-by-step directions are below. 


## Building

Most builds are just gulp commands aliased in the `package.json` `scripts` section.

See a list of all available gulp build tasks with the `gulp help` command. Take a look in package.json scripts section for the most commonly used build related commands. 

### Dev Builds

```bash

# Just build:
> npm run build

# Build and serve with watch:
> npm run serve
```

`Serve` hosts the demo app at [http://localhost:4200]().

### Release Builds

```bash
> npm run build.release

```


### Running unit tests


```bash
> npm run test
```

### Running end-to-end tests

@todo

## 


## Publishing

These steps have only been tested on OSX. It will probably work on any 'nix variant. Windows 10 with developer 'nix shell is a distinct 'maybe'. 

If you are cloning this project for your own devious purposes, see the **Using this project as a bootstrap** section, near the end.


### Do once (AKA 'setup steps')

1) Create a github access token [https://github.com/settings/tokens]() and save it in a file named `generate-changelog-token.local.txt`
1) Clean and build the project successfully



### Do every release

**Only perform a release from Master branch**

##### Assumptions
1) You have no uncommitted code. 
1) All changes intended for the release have already been merged to master. 

##### Release Process
1) Pull from origin/master
1) Run `gulp versionBump --bump=prerelease --beta && git add .`
    * There's also a --alpha flag, and --bump can take any of the semver values that npm version accepts (note, however, this is NOT using 'npm version' to do the update.) 
1) Verify the version number has been updated and that there are no other uncommitted changes. Version numbers should be consistent across modules prior to release. Pending further discussion (and build tooling), this includes even 'new' components that are in an alpha state.
1) Run `./generate-changelog.sh patch`
    2) This should only modify and `git add` the changelog file.
    2) Execute the additional steps that are printed out to the console. 
1) Verify change log generated and that there are no uncommitted changes. 
1) Run NPM publish steps, below.

The following require your npm user account credentials. Adding a local `.npmrc` file with `username=foo` and `email=foo@example.com` can make this a bit nicer.

```shell
 # sign out of your normal account
> npm logout
 # Sign in to npm account
> npm login
> Username: (tangential)
> Password:
> Email: (this IS public) (you@example.com)
> Logged in as tangential on https://registry.npmjs.org/.
> npm run publish 
```


## Using this project as a bootstrap

As mentioned, this project build structure was cloned from the [Angular Material2](https://github.com/angular/material2). The clone was made prior to the Material team updating their build to deliver a single, monolithic NPM project, in line with the Angular2 project structure. 
 
If you wish to release multiple components, but develop in a single project, this project would certainly be a good place to start. You will want to take a look at [the procedures for 'scoped projects'](https://docs.npmjs.com/getting-started/scoped-packages) in NPM, and create a user account that has the name you want to use for the parent project. For example, our project paths here are like '@tangential/scopedProjectNames', where 'tangential' is the npm 'user' name.
   



