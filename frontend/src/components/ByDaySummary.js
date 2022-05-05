import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { calcAverage } from '../utils/commonTools';
import styles from './ByDaySummary.module.css';

export default function ByDaySummary({ byDayData }) {
	return (
		<Row className="mb-3">
			<Col sm={12} md={4} lg={3} xl={3}>
				<Card className={`my-1 p-0 rounded`}>
					<Card.Header className={`${styles.cardHeader}`}>
						{' '}
						最高気温{' '}
					</Card.Header>
					<Card.Text className={styles.summaryText}>
						1位 ：
						{((
							data = byDayData.reduce((a, b) =>
								a.temp_high > b.temp_high ? a : b
							)
						) => {
							return `${data.temp_high} ℃ (${data.year} 年)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						{byDayData.length}位：
						{((
							data = byDayData.reduce((a, b) => {
								if (!a.temp_high) return b;
								if (!b.temp_high) return a;
								return a.temp_high < b.temp_high ? a : b;
							})
						) => {
							return `${data.temp_high} ℃ (${data.year} 年)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						平均：
						{`${calcAverage(
							byDayData.map((val) => val.temp_high)
						).toFixed(1)} ℃`}
					</Card.Text>
				</Card>
			</Col>
			<Col sm={12} md={4} lg={3} xl={3}>
				<Card className="my-1 p-0 rounded">
					<Card.Header className={`${styles.cardHeader}`}>
						{' '}
						最低気温{' '}
					</Card.Header>
					<Card.Text className={styles.summaryText}>
						1位 ：
						{((
							data = byDayData.reduce((a, b) =>
								a.temp_low > b.temp_low ? a : b
							)
						) => {
							return `${data.temp_low} ℃ (${data.year} 年)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						{byDayData.length}位：
						{((
							data = byDayData.reduce((a, b) => {
								if (!a.temp_low) return b;
								if (!b.temp_low) return a;
								return a.temp_low < b.temp_low ? a : b;
							})
						) => {
							return `${data.temp_low} ℃ (${data.year} 年)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						平均：
						{`${calcAverage(
							byDayData.map((val) => val.temp_low)
						).toFixed(1)} ℃`}
					</Card.Text>
				</Card>
			</Col>
			<Col sm={12} md={4} lg={3} xl={3}>
				<Card className="my-1 p-0 rounded">
					<Card.Header className={`${styles.cardHeader}`}>
						{' '}
						平均気温{' '}
					</Card.Header>
					<Card.Text className={styles.summaryText}>
						1位 ：
						{((
							data = byDayData.reduce((a, b) =>
								a.temp_avg > b.temp_avg ? a : b
							)
						) => {
							return `${data.temp_avg} ℃ (${data.year} 年)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						{byDayData.length}位：
						{((
							data = byDayData.reduce((a, b) => {
								if (!a.temp_avg) return b;
								if (!b.temp_avg) return a;
								return a.temp_avg < b.temp_avg ? a : b;
							})
						) => {
							return `${data.temp_avg} ℃ (${data.year} 年)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						平均：
						{`${calcAverage(
							byDayData.map((val) => val.temp_avg)
						).toFixed(1)} ℃`}
					</Card.Text>
				</Card>
			</Col>
			<Col sm={12} md={4} lg={3} xl={3}>
				<Card className="my-1 p-0 rounded">
					<Card.Header className={`${styles.cardHeader}`}>
						{' '}
						降雨{' '}
					</Card.Header>
					<Card.Text className={styles.summaryText}>
						0 ㎜以上：
						{((
							data = byDayData.filter((a) => a.rain_total >= 0)
						) => {
							return ` ${(
								(data.length / byDayData.length) *
								100
							).toFixed(1)}% (${data.length} 回)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						1 ㎜以上：
						{((
							data = byDayData.filter((a) => a.rain_total >= 1)
						) => {
							return ` ${(
								(data.length / byDayData.length) *
								100
							).toFixed(1)}% (${data.length} 回)`;
						})()}
					</Card.Text>
				</Card>
			</Col>
			{/* <Col sm={12} md={4} lg={3} xl={3}>
				<Card className="my-1 p-0 rounded">
					<Card.Header> 降雪 </Card.Header>
					<Card.Text className={styles.summaryText}>
						0 ㎜以上：
						{((
							data = byDayData.filter((a) => a.snow_total >= 0)
						) => {
							return ` ${((data.length / byDayData.length) * 100).toFixed(1)}% (${data.length} 回)`;
						})()}
					</Card.Text>
					<Card.Text className={styles.summaryText}>
						1 ㎜以上：
						{((
							data = byDayData.filter((a) => a.snow_total >= 1)
						) => {
							return ` ${((data.length / byDayData.length) * 100).toFixed(1)}% (${data.length} 回)`;
						})()}
					</Card.Text>
				</Card> 
			</Col>*/}
		</Row>
	);
}
