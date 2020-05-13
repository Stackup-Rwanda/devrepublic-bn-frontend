import React from 'react';
import { FormattedMessage } from 'react-intl';

const translate = (value) => <FormattedMessage id={value} values={value} />;

export default translate;
