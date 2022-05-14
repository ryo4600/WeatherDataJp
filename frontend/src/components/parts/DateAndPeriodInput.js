import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateAndPeriodInput({
	date,
	handleDateChange,
	years,
	handleYearsChange,
}) {
	const addDays = (days) => {
		var dt = new Date(date)
		dt.setDate(dt.getDate() + days);
		handleDateChange(dt);
	}

	return (
		<div className="flex-wrap my-2">
			<span className="me-3 center-text">日付</span>
			<div className="flex-wrap">
				<DatePicker
					className="py-1 px-1"
					dateFormat="MM 月 dd 日"
					selected={date}
					onChange={handleDateChange}
				/>
			</div>
			<span className="mx-3 center-text"> 期間</span>
			<div className="flex-wrap">
				<Form.Control
					as="select"
					value={years}
					onChange={(e) => handleYearsChange(e.target.value)}
				>
					<option key="10" value="10">
						10年
					</option>
					<option key="20" value="20">
						20年
					</option>
					<option key="50" value="50">
						全て
					</option>
				</Form.Control>
			</div>
			<div>
				<Button
					type="button"
					className="ms-3 btn btn-outline-primary"
					variant="transparent"
					onClick={() => addDays(-1)}
				>
					<i className="fas fa-angle-left"></i>
				</Button>
				<Button
					type="button"
					className="mx-1 btn btn-outline-primary"
					variant="transparent"
					onClick={() => handleDateChange(new Date())}
				>
					<i className="fas fa-calendar-day me-1"></i>
					<span>今日</span>
				</Button>
				<Button
					type="button"
					className="btn btn-outline-primary"
					variant="transparent"
					onClick={() => addDays(1)}
				>
					<i className="fas fa-angle-right"></i>
				</Button>
			</div>
		</div>
	);
}

export default DateAndPeriodInput;
