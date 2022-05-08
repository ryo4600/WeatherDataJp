import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateAndPeriodInput({
	date,
	handleDateChange,
	years,
	handleYearsChange,
}) {
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
		</div>
	);
}

export default DateAndPeriodInput;
