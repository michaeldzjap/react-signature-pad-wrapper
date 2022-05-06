import Environment from 'jest-environment-jsdom';
import { TextEncoder } from 'util';

import type { EnvironmentContext } from '@jest/environment';
import type { Config } from '@jest/types';

/**
 * @class
 * @classdesc A custom environment to set the TextEncoder.
 * @extends {Environment}
 */
export default class CustomTestEnvironment extends Environment {
    /**
     * Create a new environment.
     *
     * @param {Config} config
     * @param {EnvironmentContext} context
     */
    constructor(
        { globalConfig, projectConfig }: { globalConfig: Config.GlobalConfig; projectConfig: Config.ProjectConfig },
        context: EnvironmentContext,
    ) {
        super({ globalConfig, projectConfig }, context);

        if (typeof this.global.TextEncoder === 'undefined') {
            this.global.TextEncoder = TextEncoder;
        }
    }
}
