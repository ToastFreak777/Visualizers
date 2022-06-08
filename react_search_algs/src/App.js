// CSS
import "./App.css";

// Icons
import Play from "@mui/icons-material/PlayCircleFilled";
import Forward from "@mui/icons-material/SkipNextRounded";
import Backward from "@mui/icons-material/SkipPreviousRounded";
import RotateLeft from "@mui/icons-material/RotateLeftRounded";

// Components
import Ball from "./components/Ball";

// Algorithms
import LinearSearch from "./algorithms/Ls";
import BinarySearch from "./algorithms/Bs";

// React imports
import React, { Component } from "react";

class App extends Component {
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    target: 0,
    showConfig: true,
    delay: 300,
    algorithm: "Linear Search",
    timeouts: [],
  };

  ALGORITHMS = {
    "Linear Search": LinearSearch,
    "Binary Search": BinarySearch,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateSteps = () => {
    let arr = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    let target;

    if (this.state.target === 0) {
      target = arr[Math.floor(Math.random() * arr.length) + 1];
    } else {
      target = this.state.target;
    }

    this.ALGORITHMS[this.state.algorithm](arr, target, steps, colorSteps);
    this.setState({ arraySteps: steps, colorSteps, target });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));

    this.setState({ timeouts: [] });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({ colorKey: blankKey, colorSteps: [blankKey] });
  };

  generateRandomNumbers = () => Math.floor(Math.random() * 100);

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();

    let count = this.state.count;
    let temp = [];

    for (let i = 0; i < count; i++) {
      temp[i] = this.generateRandomNumbers();
    }

    this.setState({ array: temp, arraySteps: [temp], currentStep: 0 }, () => {
      this.generateSteps();
    });
  };

  changeAlgorithm = (e) => {
    if (e.target.value === "Binary Search") {
      this.setState(
        {
          array: this.state.array.sort((a, b) => a - b),
          arraySteps: [this.state.arraySteps[0]],
          colorSteps: [this.state.colorKey],
          algorithm: e.target.value,
          delay: 800,
        },
        () => this.generateSteps()
      );
    } else {
      this.setState(
        {
          array: this.state.array,
          arraySteps: [this.state.arraySteps[0]],
          colorSteps: [this.state.colorKey],
          algorithm: e.target.value,
        },
        () => this.generateSteps()
      );
    }
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
    let balls = this.state.array.map((value, index) => (
      <Ball
        key={index}
        index={index}
        value={value}
        color={this.state.colorKey[index]}
      />
    ));

    let playButton, configButton;

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

    if (this.state.showConfig) {
      configButton = (
        <div className="config-form">
          <div className="config-wrapper">
            <div className="form-options">
              <label htmlFor="value">Target</label>
              <input
                type="number"
                name="value"
                value={this.state.target}
                onChange={(e) =>
                  this.setState(
                    {
                      arraySteps: [this.state.array],
                      colorSteps: [this.state.colorKey],
                      target: Number(e.target.value),
                    },
                    () => {
                      this.generateSteps();
                    }
                  )
                }
              />
            </div>
            <div className="form-options">
              <label htmlFor="count">Count</label>
              <input
                type="number"
                name="count"
                value={this.state.count}
                onChange={(e) =>
                  this.setState({ count: Number(e.target.value) }, () =>
                    this.generateRandomArray()
                  )
                }
              />
            </div>
            <button
              onClick={() => {
                this.setState({ showConfig: !this.state.showConfig });
              }}
            >
              Hide
            </button>
          </div>
        </div>
      );
    } else {
      configButton = (
        <button
          className="config"
          onClick={() => {
            this.setState({ showConfig: !this.state.showConfig });
          }}
        >
          Config
        </button>
      );
    }

    return (
      <div className="app">
        <div className="frame">
          <div className="ballsDiv container card">{balls}</div>
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
              <option value="Linear Search">Linear Search</option>
              <option value="Binary Search">Binary Search</option>
            </select>
            {configButton}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
