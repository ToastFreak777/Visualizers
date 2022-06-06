// React imports
import React, { Component } from "react";

// Components
import Bar from "./components/Bar";

// Algorithms
import BubbleSort from "./algorithms/Bs";
import InsertionSort from "./algorithms/Is";
import SelectionSort from "./algorithms/Ss";
import MergeSort from "./algorithms/Ms";
import QuickSort from "./algorithms/Qs";
import HeapSort from "./algorithms/Hs";

// CSS
import "./App.css";

// Icons
import Play from "@mui/icons-material/PlayCircleFilled";
import Forward from "@mui/icons-material/SkipNextRounded";
import Backward from "@mui/icons-material/SkipPreviousRounded";
import RotateLeft from "@mui/icons-material/RotateLeftRounded";

class App extends Component {
  // initial State
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 100,
    algorithm: "Bubble Sort",
    timeouts: [],
  };

  ALGORITHMS = {
    "Bubble Sort": BubbleSort,
    "Selection Sort": SelectionSort,
    "Insertion Sort": InsertionSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
    "Heap Sort": HeapSort,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateSteps = () => {
    let arr = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGORITHMS[this.state.algorithm](arr, 0, steps, colorSteps);
    this.setState({ arraySteps: steps, colorSteps });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));

    this.setState({ timeouts: [] });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);

    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateRandomNumber = (max, min) =>
    Math.floor(Math.random() * (max - min) + min);

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();

    const count = this.state.count;
    const temp = [];

    for (let i = 0; i < count; i++)
      temp.push(this.generateRandomNumber(50, 200));

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  changeAlgorithm = (e) => {
    if (e.target.value === "Insertion Sort") {
      this.setState({ delay: 500 });
    }

    this.setState(
      {
        arraySteps: [this.state.arraySteps[0]],
        colorSteps: [this.state.colorKey],
        algorithm: e.target.value,
      },
      () => this.generateSteps()
    );
  };

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;

    this.setState(
      {
        array: arr,
        arraySteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };
  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === this.state.arraySteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  start = () => {
    let array_steps = this.state.arraySteps;
    let color_steps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;

    while (i < array_steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: array_steps[currentStep],
          colorKey: color_steps[currentStep],
          currentStep: currentStep + 1,
        });

        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }
    this.setState({ timeouts });
  };

  restart = () => {
    this.clearTimeouts();

    this.setState({
      array: this.state.arraySteps[0],
      colorKey: new Array(this.state.count).fill(0),
      currentStep: 0,
    });
  };

  render() {
    let bars = this.state.array.map((value, index) => (
      <Bar
        key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

    let playButton;

    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.restart}>
          <RotateLeft />
        </button>
      );
    } else {
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    return (
      <div className="app">
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="control-panel">
          <div className="controller-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
        <div className="panel">
          <div className="panel-config">
            <select
              defaultValue={this.state.algorithm}
              onChange={this.changeAlgorithm}
            >
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Selection Sort">Selection Sort</option>
              <option value="Insertion Sort">Insertion Sort</option>
              <option value="Merge Sort">Merge Sort</option>
              <option value="Quick Sort">Quick Sort</option>
              <option value="Heap Sort">Heap Sort</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
