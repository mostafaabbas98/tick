import React from 'react';
import {Text} from 'ink';

export default function Start({taskName}: {taskName: String}) {
	return (
		<Text>
			Start tracking a task <Text color="green">{taskName}</Text>
		</Text>
	);
}
