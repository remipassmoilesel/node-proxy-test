import { AssetsFilterHook } from './hooks/AssetsFilterHook';
import { AuthorizationHeaderHook } from './hooks/AuthorizationHeaderHook';
import { ContentTypeFilterHook } from './hooks/ContentTypeFilterHook';
import { AbstractHttpRecordingHook } from './hooks/lib/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/lib/AbstractTestGenerationHook';
import { UserAgentHeaderHook } from './hooks/UserAgentHeaderHook';

/**
 * ========================================================================
 * Register here hooks you want to apply on recording or on test generation.
 * ========================================================================
 */

export const httpRecordingHooks: AbstractHttpRecordingHook[] = [
    new AssetsFilterHook(),
    new ContentTypeFilterHook(),
];

export const testGenerationHooks: AbstractTestGenerationHook[] = [
    new AuthorizationHeaderHook(),
    // new UserAgentHeaderHook(),
];
