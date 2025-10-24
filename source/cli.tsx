#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import {type Command, commands} from './types/index.js';
import Start from './commands/Start.js';
import Stop from './commands/Stop.js';
import Pause from './commands/Pause.js';

const cli = meow(
	`
	Usage
		$ tick <command> [options]

	Commands
    start <task> Start tracking a task (task name is required)
    stop	       Ends current task and saves duration
		pause	       Temporarily stops counting but doesn’t end task

  Examples
    $ tick start "Build landing page"
    $ tick pause
    $ tick stop
`,
	{
		importMeta: import.meta,
	},
);

const [commandInput, ...args] = cli.input;

if (!commandInput || !commands.includes(commandInput as Command)) {
	console.error(`\nInvalid command: "${commandInput ?? ''}"`);
	console.log('\nAvailable commands:');
	commands.forEach(cmd => console.log(`  - ${cmd}`));
	console.log('\nRun "tick --help" for usage.\n');
	process.exit(1);
}

const command = commandInput as Command;

if (command === 'start' && args.length === 0) {
	console.error('\nError: You must provide a task name.');
	console.log('Example:\n  tick start "Write documentation"\n');
	process.exit(1);
}

// Type-safe switch
switch (command) {
	case 'start':
		render(<Start taskName={args.join(' ')} />);
		break;
	case 'pause':
		render(<Pause />);
		break;
	case 'stop':
		render(<Stop />);
		break;
}
