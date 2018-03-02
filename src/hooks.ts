import { AssetsFilterHook } from './hooks/AssetsFilterHook';
import { AuthorizationHeaderHook } from './hooks/AuthorizationHeaderHook';
import { ContentTypeFilterHook } from './hooks/ContentTypeFilterHook';
import {HostHeaderHook} from './hooks/HostHeaderHook';
import { AbstractHttpRecordingHook } from './hooks/lib/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/lib/AbstractTestGenerationHook';
import { UserAgentHeaderHook } from './hooks/UserAgentHeaderHook';
import { UuidV4Hook } from './hooks/UuidV4Hook';

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
