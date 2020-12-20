import React from 'react';
import {NavLink} from 'react-router-dom';
import IntlMessage from 'IntlMessage';
import styles from './Nav.module.scss';

const Nav = (props) => {
	const {linkList} = props;

	return (
		<div className={styles.elementNav}>
			<ul className={styles.list}>
				{linkList.map(({path, msg_key}) => (
					<li className={styles['list__item']} key={msg_key}>
						<NavLink
							to={`${path}`}
							activeClassName={styles.selected}
							isActive={(match) => match && match.isExact}>
							{IntlMessage(msg_key)}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Nav;
