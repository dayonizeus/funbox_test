import React, { useState } from "react";
import ReactDOM from "react-dom";
import './style.scss';
import {Card} from './blocks/card/card';

ReactDOM.render(<Card type='с фуа-гра' portion='10' mice='1' size='0,5' />, document.getElementById("single-block__first"));
ReactDOM.render(<Card type='с рыбой' portion='40' mice='2' size='2' />, document.getElementById("single-block__second"));
ReactDOM.render(<Card type='c курой' portion='100' mice='5' size='5' satisfied='true' availability='false' />, document.getElementById("single-block__third"));