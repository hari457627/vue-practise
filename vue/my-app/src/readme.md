# CodingLabs React Native Starter Template
This repository contains starter code for the challenges in React Native learning track of [CodingLabs](http://codinglabs.in/#/home).

# Usage
1. Create a gitlab account using Wavelabs account
2. Fork and clone this repository.
3. Run `npm install` in the root directory

# Guidelines for code
- Files should be named using camelCase. Eg: `index.js`, `someFile.js`
- Directories should be named in lowercase. Eg: `src`, `screens`
- Project directory structure:
```
-src
    -challenge name
        -screens
            -screen1
                -components
                    -Parent
                        index.js
                        style.js
                    -Child
                        index.js
                        style.js
                -index.js
                -style.js
```
- Comments should be written in [Java's standard format](https://www.oracle.com/technetwork/java/javase/documentation/codeconventions-141999.html)
- Component names should be written in CamelCase with uppercased starting letter. Eg: `FirstComponent`
- Functions, styles and variables names with camelCase with lowercased starting letter. Eg: `someFn()`, `someVar`
- Write every style of a component in its stylesheet as seperate JS file
- Self-explainatory names should be used for functions, variables, components, styles and files.
- Log time spent on a challenge in a README file in the challenges directory with remarks and concerns if there are any.