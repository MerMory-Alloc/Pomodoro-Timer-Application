# Pomodoro Timer Application - Documentation

## Introduction

This is a React App that implements a Pomodoro timer. The Pomodoro Technique is a time management method that breaks work into intervals, typically 25 minutes long, separated by short breaks. This documentation outlines the features, props, state variables, side effects, dependencies, and additional functions of the Pomodoro Timer Application main component.

### Links

live URL: [Pomodoro Timer](https://fluffy-chimera-99733a.netlify.app/)

## Features

The Pomodoro Timer Application component offers the following features:

- Timer Durations: Users can set the durations for the Pomodoro session, short break, and long break.
- Start/Pause Functionality: The timer can be started or paused by clicking on the timer display.
- Timer Countdown: The timer displays the remaining time in minutes and seconds.
- Progress Bar: A circular progress bar visually represents the progress of the timer.
- Timer Pages: The timer has three pages: Pomodoro, Short Break, and Long Break, each with a different duration.
- Settings Modal: Users can open a settings modal to configure timer durations, fonts and colors settings.
- Reset Functionality: The timer can be reset to its initial state by clicking the reset button.

## Props

The App component does not accept any props.

The MyModal component accepts the following props:

- `props.pomo`: Initial value for the pomodoro timer duration in seconds.
- `props.short`: Initial value for the short break duration in seconds.
- `props.long`: Initial value for the long break duration in seconds.
- `props.fonts`: Initial array of font options.
- `props.colors`: Initial array of color options.
- `props.applyConfigs`: Function to apply the selected settings.

## State

The App component manages the following state variables using React's useState hook:

- `defaultTimesLength`: An array containing the default durations for the Pomodoro session, short break, and long break.
- `pomodoro`: The current Pomodoro session number.
- `pomodoroTimer`: The remaining time for the Pomodoro session.
- `shortBreak`: The remaining time for the short break.
- `longBreak`: The remaining time for the long break.
- `isPaused`: A boolean indicating whether the timer is paused or not.
- `shortBreakIsPaused`: A boolean indicating whether the short break timer is paused or not.
- `longBreakIsPaused`: A boolean indicating whether the long break timer is paused or not.
- `page`: The current timer page (0 for Pomodoro, 1 for Short Break, 2 for Long Break).
- `isOpen`: A boolean indicating whether the settings modal is open or not.
- `fonts`: An array containing the available fonts for the timer display.
- `colors`: An array containing the available colors for the timer display.
- `shouldPlay`: A boolean indicating whether audio should play when the timer ends.

The MyModal component manages the following states:

- `pomodoro`: Current value for the pomodoro timer duration in seconds.
- `shortBreak`: Current value for the short break duration in seconds.
- `longBreak`: Current value for the long break duration in seconds.
- `fonts`: Current array of font options.
- `colors`: Current array of color options.

## Some Functionalities

The App component includes additional helper functions to support the timer functionality and user interactions:

- format the time: the remaining minutes and seconds gets formatted to represent the time in "MM:SS" format.
- `renderTextBtn()`: determines the text to display on a button based on the values of `page`, `isPaused`, `shortBreakIsPaused`, and `longBreakIsPaused`. If `isPausedValue` is true, the function returns 'Start', otherwise it returns 'Pause'.
- `handlePauseResume()`: to handle pausing and resuming of a timer based on the current page.
- `handlePage()`: to change the view and the page of the timer.
- `toggleModal()`: This function opens the settings modal by setting the `isOpen` state variable to true and closes it by setting the `isOpen` state variable to false.
- `handleReset()`: performs a series of actions to reset all states to thier initial values.
- `applyConfigs()`: takes in several parameters: `pomodoroTimer`, `shortBreak`, `longBreak`, `fonts`, and `colors` that comes from the Modal component and apply the new values to the states and saves it the local storage.

## Event Handlers

The MyModal component defines the following event handlers:

- `handleInput(event)`: Handles input changes for the timer duration inputs (session-length, break-length, longBreakMins).
- `handleFontRadioChange(event)`: Handles radio button changes for font selection.
- `handleColorRadioChange(event)`: Handles radio button changes for color selection.
- `handleApplyBtn()`: Handles the click event for the apply button, calling the props.applyConfigs function with the selected settings.
- `incrementValue(event)`: Handles the click event for the increment buttons, increasing the corresponding timer duration if the maximum value is not exceeded.
- `decrementValue(event)`: Handles the click event for the decrement buttons, decreasing the corresponding timer duration if the minimum value is not exceeded.

## Side Effects

The App component uses React's useEffect hook to perform the following side effects:

- Update Font Family: Updates the font family for the timer display (on the body element) based on the selected font in the settings.
- Persist Timer Settings: Persists the timer durations, fonts, colors, and sound settings in local storage.
- Update Timer Countdown: Updates the timer countdown based on the selected page and whether the timer is paused or not.

## Dependencies

The App component has the following dependencies:

- react-modal: A library for creating accessible modal dialogs.
- react-circular-progressbar: A circular progress bar component for React.
- react-circular-progressbar/dist/styles.css: CSS styles for the circular progress bar.

## Conclusion

Completing the Pomodoro Timer Application  provided me with practical experience in building a timer application using React. Throughout this challenge, I deepen my understanding of managing state variables, leveraging hooks like useState and useEffect for side effects, and working with dependencies to enhance the application's functionality. It  demonstrates to me the power of React in creating dynamic and responsive interfaces.

the design is inspired from the challenge in [Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G)