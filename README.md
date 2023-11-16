# Note App – React Native
*Lisa Mari Myrene - Code University Of Applied Sciences*

## Project overview
The Note App is a React Native mobile application where you can add, edit and delete your personal post-it notes. In each note you can add title and the content of your note, as well as choosing a picture to implement from your media library, or simply by taking a new photo. You are also able to change the color of your post-it note. This app is ment as an introduction for learning React Native and to dive deeper into the more specific properties of mobile application development.

## Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Xcode 15 ](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio)

## Recommended Visual Studio Code plugins
* [Expo Tools](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools)
* [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
* [ESlint Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Format On Save](https://youtube.com/shorts/Z1fLL_e9eKc?si=oDDpb99nyyMeBHuV)

## Installation intructions

The app is configured with Expo. Expo makes it easy to simulate the application in both Android and iOS. To start the application, run the command beneath.

1. This project uses yarn to install dependencies and to run the project.If you don't have yarn installed, please install writing:
```sh
npm install --global yarn
```
 
2. To install all dependencies needed for the application to run seamlessly, run: 
```sh
yarn add
``` 

3. To start the application on the server, run:
```sh
yarn start
``` 

4. Depending on if you are running the applicaiton on iOS or Android, you need to type in different prompts for choosing your simulator:
- For **iOS**, please type `I` for starting the iOS simulator.
- For **Andriod**, please type `A` for starting the Android simulator. 

### Errors

If you get an error this when trying to open the **iOS** simulator:  

```sh
Xcode must be fully installed before you can continue. Continue to the App Store? [Y/n]]
```

Make sure `XCode` is actually installed, and that you have installed the cli tools (can be found under xcode settings → locations). 

If it is indeed installed, then run this command to fix it: 

```sh
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

*Source: https://github.com/expo/expo/issues/21727*

## Code format
The code follows the ESLint formatting guide, which is already configured. 

You are encouraged to install an eslint-plugin for your chosen editor, for instance, [vscode-eslint](https://github.com/Microsoft/vscode-eslint) for Visual Studio Code.

Configuring it to run `eslint --fix` on save can be a great tool for productivity. 

You can also lint the code manually from the project directory if you want:

```sh
yarn run lint
```

## Testing 
The project uses `Jest`, a JavaScript testing framework.

 To run the testing manually you can type:
```sh
yarn jest
```

## File structure
### app
In app you will fint the two pages that are linked in the Expo Routing. 

### assets
In assets you will find decorative items, such as svg's. 

### src
In src will you find the main functionality of the application such as:
* **components**
    - All the components are stored in this folder.
* **context**
    - The useContext API, to access and update the states globally.
* **hooks**
    - the useNotes hook that listens on states and render useEffect accordingly.
* **pages**
    - Page components that gathers all the children compoents.
* **tests**
    - Test folder for creating tests. 
* **utils**
    -  Contains helper functions for better reusability and seperation.

### themes
Stores the colors of the application, to use in styling.

## Contributing Guidelines
When commiting to git, please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), a specification for adding human and machine readable meaning to commit messages. 

The pull request need to pass all the Jest tests, before getting approved. 

The code also need to be following the ESLint coding formatting standard. 
