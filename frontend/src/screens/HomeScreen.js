import React, {useEffect, useState} from 'react'

//-----------------------------------------------------------------------------
// SCREEN: Home
//-----------------------------------------------------------------------------
function HomeScreen() {

	useEffect(() => {
		document.title="いつもの天気（ホーム)"
		return () => {
			//cleanup
		}
	}, [])


	return (
		<div>
			Homee
		</div>
	)
}

export default HomeScreen
