import cx from 'classnames';
import React from 'react';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

class Day extends React.Component {
	render() {
		const i = this.props.i;
		const w = this.props.w;
		const prevMonth = (w === 0 && i > 7);
		const nextMonth = (w >= 4 && i <= 14);
		const cn = cx({
			'prev-month': prevMonth,
			'next-month': nextMonth,
			'current-day': !prevMonth && !nextMonth && (i === this.props.d)
		});

		return <td className={cn} {... this.props}>{i}</td>;
	}
}

class Calendar extends React.Component {
	render() {
		const m = this.props.moment;
		const d = m.date();
		const d1 = m.clone().subtract(1, 'month').endOf('month').date();
		const d2 = m.clone().date(1).day();
		const d3 = m.clone().endOf('month').date();

		const days = [].concat(
			range(d1 - d2 + 1, d1 + 1),
			range(1, d3 + 1),
			range(1, 42 - d3 - d2 + 1)
		);

    // var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const weeks = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

		return (
			<div className={cx('m-calendar', this.props.className)}>
				<div className='toolbar'>
					<button type='button' className='prev-month' onClick={this.prevMonth}>
						<i className={this.props.prevMonthIcon}/>
					</button>
					<span className='current-date'>{m.format('MMMM YYYY')}</span>
					<button type='button' className='next-month' onClick={this.nextMonth}>
						<i className={this.props.nextMonthIcon}/>
					</button>
				</div>

				<table>
					<thead>
						<tr>
							{weeks.map((w, i) => {
								return <td key={i}>{w}</td>;
							})}
						</tr>
					</thead>

					<tbody>
						{chunk(days, 7).map((row, w) => {
							return (
								<tr key={w}>
									{row.map((i) => {
										return <Day key={i} i={i} d={d} w={w} onClick={this.selectDate.bind(null, i, w)} />;
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

	selectDate(i, w) {
		const prevMonth = (w === 0 && i > 7);
		const nextMonth = (w >= 4 && i <= 14);
		const m = this.props.moment;

		m.date(i);
		if (prevMonth) m.subtract(1, 'month');
		if (nextMonth) m.add(1, 'month');

		this.props.onChange(m);
	}

	prevMonth(e) {
		e.preventDefault();
		this.props.onChange(this.props.moment.subtract(1, 'month'));
	}

	nextMonth(e) {
		e.preventDefault();
		this.props.onChange(this.props.moment.add(1, 'month'));
	}
};

export default Calendar;
