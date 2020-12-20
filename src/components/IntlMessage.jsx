import {useIntl} from 'react-intl';
export default function IntlMessage(id, defaultMessage) {
	return useIntl().formatMessage({
		id,
		defaultMessage: defaultMessage ? defaultMessage : id,
	});
}
