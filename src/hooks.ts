import { AuthorizationHeaderHook } from './hooks/generation/AuthorizationHeaderHook';
import { HeadersCleaningHook } from './hooks/generation/HeadersCleaningHook';
import { HttpHostHook } from './hooks/generation/HttpHostHook';
import { UuidV4Hook } from './hooks/generation/UuidV4Hook';
import { AbstractHttpRecordingHook } from './hooks/models/AbstractHttpRecordingHook';
import { AbstractTestGenerationHook } from './hooks/models/AbstractTestGenerationHook';
import { AssetsFilterHook } from './hooks/recording/AssetsFilterHook';
import { ContentTypeFilterHook } from './hooks/recording/ContentTypeFilterHook';
import { HttpMethodFilterHook } from './hooks/recording/HttpMethodFilterHook';

/**
 * ========================================================================
 * Register here hooks you want to apply on recording or on test generation.
 * ========================================================================
 */

export const httpRecordingHooks: AbstractHttpRecordingHook[] = [
    new HttpMethodFilterHook(),
    new AssetsFilterHook(),
    new ContentTypeFilterHook(),
];

export const testGenerationHooks: AbstractTestGenerationHook[] = [
    new AuthorizationHeaderHook(),
    new HttpHostHook(),
    new UuidV4Hook({replaceInResponse: false}),
    new HeadersCleaningHook(),
    // new UserAgentHeaderHook(),
];
