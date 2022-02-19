import React , {useContext} from 'react';
import { CSwitch } from '@coreui/react';

const Switch = ({ item }) => {
    return (
		<td className="py-2">
			<CSwitch
				color={'success'}
				variant={'opposite'}
				shape={'pill'}
				labelOn={'on'}
				labelOff={'off'}
				value={'danger'}
				checked={item && item.enable ? true : false}
			/>
		</td>
	);
}

export default Switch;

