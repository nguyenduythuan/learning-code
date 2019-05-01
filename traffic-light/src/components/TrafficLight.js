import React, {Component} from 'react';
import './TrafficLight.css';
import classNames from 'classnames';

const RED = 1;
const GREEN = 2;
const ORANGE = 3;   

class TrafficLight extends Component {
    render() {
        const {currentColor} = this.props.state;
        return(
            <div>
                <div className="TrafficLight">
                    <div className={ classNames('build', 'red', {
                        active: currentColor === RED
                    })}></div>
                    <div className={ classNames('build', 'orange', {
                        active: currentColor === ORANGE
                    })}></div>
                    <div className={ classNames('build', 'green', {
                        active: currentColor === GREEN
                    })}></div>
                </div>
                <div className="Chan1"></div>
                <div className="Chan2"></div>
            </div>
        );
    }
}

export default TrafficLight;