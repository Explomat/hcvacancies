import cx from 'classnames';
import React from 'react';
import InputSlider from 'react-input-slider';

class Time extends React.Component {
	
	handleChangeHours(pos) {
		const m = this.props.moment;
		m.hours(parseInt(pos.x, 10));
		this.props.onChange(m);
	}

	handleChangeMinutes(pos) {
		const m = this.props.moment;
		m.minutes(parseInt(pos.x, 10) * 5);
		this.props.onChange(m);
	}
	
	render(){
		const m = this.props.moment;

		return (
			<div className={cx('m-time', this.props.className)}>
				<div className='showtime'>
					<span className='time'>{m.format('HH')}</span>
					<span className='separater'>:</span>
					<span className='time'>{m.format('mm')}</span>
				</div>

				<div className='sliders'>
					<div className='time-text'>Часы:</div>
					<InputSlider
						className='u-slider-time'
						xmin={0}
						xmax={23}
						x={m.hour()}
						onChange={this.handleChangeHours}
					/>
					<div className='time-text'>Минуты:</div>
					<InputSlider
						className='u-slider-time'
						xmin={0}
						xmax={11}
						x={m.minute() / 5}
						onChange={this.handleChangeMinutes}
					/>
				</div>
			</div>
		);
	}
}

export default Time;
