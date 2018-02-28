import { AssetsFilterHook } from "./hooks/AssetsFilterHook";
import { AbstractHttpRecordingHook } from "./hooks/lib/AbstractHttpRecordingHook";
import { AbstractTestGenerationHook } from "./hooks/lib/AbstractTestGenerationHook";
import { BearerHook } from './hooks/BearerHook';

/**
 * ========================================================================
 * Register here hooks you want to apply on recording or on test generation.
 * ========================================================================
 */

export const httpRecordingHooks: AbstractHttpRecordingHook[] = [
    new AssetsFilterHook(),
];

export const testGenerationHooks: AbstractTestGenerationHook[] = [
    new BearerHook(),
]; // [new UserAgentHook(), new AcceptEncodingHook()];
