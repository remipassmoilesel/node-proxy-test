import { AssetsFilterHook } from './hooks/recording/AssetsFilterHook';
import { AuthorizationHeaderHook } from './hooks/generation/AuthorizationHeaderHook';
import { ContentTypeFilterHook } from './hooks/recording/ContentTypeFilterHook';
import {HostHeaderHook} from './hooks/generation/HostHeaderHook';
import { AbstractHttpRecordingHook } from './hooks/lib/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/lib/AbstractTestGenerationHook';
import { UserAgentHeaderHook } from './hooks/generation/UserAgentHeaderHook';
import { UuidV4Hook } from './hooks/generation/UuidV4Hook';

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
    new UuidV4Hook({replaceInResponse: false}),
    // new HostHeaderHook('old-domain.com', 'new-domain.com'),
    // new UserAgentHeaderHook(),
];
