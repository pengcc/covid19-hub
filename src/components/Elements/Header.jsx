import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Nav from './Nav';
import AccountMenu from './AccountMenu';
import {navLinkList} from 'Routes';

import LocaleSelect from './LocaleSelect';

import {LogoIcon} from 'SvgIcons';

import styles from './Header.module.scss';

const Header = () => {
	const currentLocation = useLocation();
	const isChartViewPage = currentLocation.pathname === '/';

	return (
		<div
			className={`${styles.elementHeader} ${
				isChartViewPage ? styles.chartViewPage : ''
			}`}>
			<div className={styles.contentWrapper}>
				<div className={styles.logo}>
					<Link to="">
						<LogoIcon />
					</Link>
					<span className={styles.versionText}>@beta</span>
				</div>
				<div className={styles.nav}>
					<Nav linkList={navLinkList} />
				</div>
				<div className={styles.account}>
					<AccountMenu />
				</div>
				<div className={styles.locale}>
					<LocaleSelect />
				</div>
			</div>
		</div>
	);
};

export default Header;
