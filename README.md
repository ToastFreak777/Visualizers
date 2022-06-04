# Visualizers

Visual Helper

## SJF Algorithm Visualizer

- This is a basic example of the SJF operating system algorithm.
- assumes all processes arrive at the same time in a batch

### Functionality

- SJF => Shortest Job First

  - Targets the shortest job in a process.
  - When supplied with values it will search out for the shortest to complete job and then move on the the next.
  - (**Not yet implemented**) Arrival time of jobs is taken into account
    - if a job takes 10s to finish and the next shortest job is added 5s into the process then when the current process is finished that job will be next

## Bubble Sort visualizer

- Simple sorting algorithm.
- Repeatedly swaps adjacent elements if they're in wrong order
- Not recommended for large data sets
- Time complexity
  - Best case: O (N) **Linear**
  - Worst case: O (N^2) **Quadratic**
- Space complexity: 0(1) **Constant**

## React Sorting Algorithms

- To get some react practice I decided to do the rest to the algorithms in react. Rather then swapping elements using DOM I'll use react and State

- ### Contains
  - Bubble Sort
  - Selection Sort
  - (FUTURE) Insertion Sort
  - (FUTURE) Merge Sort
  - (FUTURE) Quick Sort
  - (FUTURE) Heap Sort
