import React, { useRef } from 'react';

import clamp from 'lodash-es/clamp';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './styles.css';

const pages = [
	'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
	'https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1682&q=80',
	'https://images.unsplash.com/photo-1534577403868-27b805ca4b9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3319&q=80',
	'https://images.unsplash.com/photo-1516707349512-54781082cf08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
	'https://images.unsplash.com/photo-1602183245419-82ae4ff801d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
];

const App = () => {
	const index = useRef(0);
	const [props, set] = useSprings(pages.length, (i) => ({
		x: i * window.innerWidth,
		sc: 1,
		display: 'block',
	}));
	const bind = useGesture(
		({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
			if (down && distance > window.innerWidth / 6)
				cancel(
					(index.current = clamp(
						index.current + (xDir > 0 ? -1 : 1),
						0,
						pages.length - 1
					))
				);
			set((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: 'none' };
				const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
				const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
				return { x, sc, display: 'block' };
			});
		}
	);
	return (
		<React.Fragment>
			{props.map(({ x, display, sc }, i) => (
				<animated.div
					{...bind()}
					key={i}
					style={{
						display,
						transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
					}}
					className="slider">
					<animated.div
						style={{
							transform: sc.interpolate((s) => `scale(${s})`),
							backgroundImage: `url(${pages[i]})`,
						}}
						className="slider-item"
						></animated.div>
				</animated.div>
			))}

			<div className='text'>
				<h4>Лес</h4>
				<ul>
					<li>Множество дикорастущих деревьев, расположенных на большом пространстве; пространство, обильно проросшее деревьями.</li>
					<li>Большое количество, множетсва (о вызвышающихся предметах).</li>
				</ul>
			</div>
		</React.Fragment>
	);
};

export default App;
