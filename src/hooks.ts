import { AuthorizationHeaderHook } from './hooks/generation/AuthorizationHeaderHook';
import { HeadersCleaningHook } from './hooks/generation/HeadersCleaningHook';
import { UuidV4Hook } from './hooks/generation/UuidV4Hook';
import { AbstractHttpRecordingHook } from './hooks/lib/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/lib/AbstractTestGenerationHook';
import { AssetsFilterHook } from './hooks/recording/AssetsFilterHook';
import { ContentTypeFilterHook } from './hooks/recording/ContentTypeFilterHook';

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
    new HeadersCleaningHook(),
    // new HostHeaderHook('old-domain.com', 'new-domain.com'),
    // new UserAgentHeaderHook(),
];
