
const R = Math.PI / 180;

const latLonDistance = (lat1, lng1, lat2, lng2) => {
	lat1 *= R;
	lng1 *= R;
	lat2 *= R;
	lng2 *= R;
	return (
		6371 *
		Math.acos(
			Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
				Math.sin(lat1) * Math.sin(lat2)
		)
	);
};

module.exports = {
	latLonDistance
}