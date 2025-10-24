export const commands = ['start', 'stop', 'pause'] as const;
export type Command = (typeof commands)[number];
