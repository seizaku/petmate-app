/* eslint-disable */
import type { Prisma, BusinessDocument } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateBusinessDocument(options?: Omit<(UseMutationOptions<(BusinessDocument | undefined), DefaultError, Prisma.BusinessDocumentCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentCreateArgs, DefaultError, BusinessDocument, true>('BusinessDocument', 'POST', `${endpoint}/businessDocument/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyBusinessDocument(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.BusinessDocumentCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('BusinessDocument', 'POST', `${endpoint}/businessDocument/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyBusinessDocument<TArgs extends Prisma.BusinessDocumentFindManyArgs, TQueryFnData = Array<Prisma.BusinessDocumentGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findMany`, args, options, fetch);
}

export function useInfiniteFindManyBusinessDocument<TArgs extends Prisma.BusinessDocumentFindManyArgs, TQueryFnData = Array<Prisma.BusinessDocumentGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findMany`, args, options, fetch);
}

export function useSuspenseFindManyBusinessDocument<TArgs extends Prisma.BusinessDocumentFindManyArgs, TQueryFnData = Array<Prisma.BusinessDocumentGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyBusinessDocument<TArgs extends Prisma.BusinessDocumentFindManyArgs, TQueryFnData = Array<Prisma.BusinessDocumentGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findMany`, args, options, fetch);
}

export function useFindUniqueBusinessDocument<TArgs extends Prisma.BusinessDocumentFindUniqueArgs, TQueryFnData = Prisma.BusinessDocumentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueBusinessDocument<TArgs extends Prisma.BusinessDocumentFindUniqueArgs, TQueryFnData = Prisma.BusinessDocumentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findUnique`, args, options, fetch);
}

export function useFindFirstBusinessDocument<TArgs extends Prisma.BusinessDocumentFindFirstArgs, TQueryFnData = Prisma.BusinessDocumentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstBusinessDocument<TArgs extends Prisma.BusinessDocumentFindFirstArgs, TQueryFnData = Prisma.BusinessDocumentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/findFirst`, args, options, fetch);
}

export function useUpdateBusinessDocument(options?: Omit<(UseMutationOptions<(BusinessDocument | undefined), DefaultError, Prisma.BusinessDocumentUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentUpdateArgs, DefaultError, BusinessDocument, true>('BusinessDocument', 'PUT', `${endpoint}/businessDocument/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyBusinessDocument(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.BusinessDocumentUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('BusinessDocument', 'PUT', `${endpoint}/businessDocument/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertBusinessDocument(options?: Omit<(UseMutationOptions<(BusinessDocument | undefined), DefaultError, Prisma.BusinessDocumentUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentUpsertArgs, DefaultError, BusinessDocument, true>('BusinessDocument', 'POST', `${endpoint}/businessDocument/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteBusinessDocument(options?: Omit<(UseMutationOptions<(BusinessDocument | undefined), DefaultError, Prisma.BusinessDocumentDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentDeleteArgs, DefaultError, BusinessDocument, true>('BusinessDocument', 'DELETE', `${endpoint}/businessDocument/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, BusinessDocument, Prisma.BusinessDocumentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyBusinessDocument(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.BusinessDocumentDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.BusinessDocumentDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('BusinessDocument', 'DELETE', `${endpoint}/businessDocument/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.BusinessDocumentDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.BusinessDocumentDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.BusinessDocumentDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateBusinessDocument<TArgs extends Prisma.BusinessDocumentAggregateArgs, TQueryFnData = Prisma.GetBusinessDocumentAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateBusinessDocument<TArgs extends Prisma.BusinessDocumentAggregateArgs, TQueryFnData = Prisma.GetBusinessDocumentAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/aggregate`, args, options, fetch);
}

export function useGroupByBusinessDocument<TArgs extends Prisma.BusinessDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.BusinessDocumentGroupByArgs['orderBy'] } : { orderBy?: Prisma.BusinessDocumentGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.BusinessDocumentGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.BusinessDocumentGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.BusinessDocumentGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.BusinessDocumentGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.BusinessDocumentGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByBusinessDocument<TArgs extends Prisma.BusinessDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.BusinessDocumentGroupByArgs['orderBy'] } : { orderBy?: Prisma.BusinessDocumentGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
        [P in HavingFields]: P extends ByFields
        ? never
        : P extends string
        ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
        : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`,
        ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<TArgs>
    ? 'orderBy' extends Prisma.Keys<TArgs>
    ? ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
        [P in OrderFields]: P extends ByFields
        ? never
        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields], TQueryFnData = {} extends InputErrors ?
    Array<PickEnumerable<Prisma.BusinessDocumentGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.BusinessDocumentGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.BusinessDocumentGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.BusinessDocumentGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.BusinessDocumentGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/groupBy`, args, options, fetch);
}

export function useCountBusinessDocument<TArgs extends Prisma.BusinessDocumentCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.BusinessDocumentCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/count`, args, options, fetch);
}

export function useSuspenseCountBusinessDocument<TArgs extends Prisma.BusinessDocumentCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.BusinessDocumentCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.BusinessDocumentCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('BusinessDocument', `${endpoint}/businessDocument/count`, args, options, fetch);
}

export function useCheckBusinessDocument<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; license?: string; businessPermit?: string; certification?: string; businessId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('BusinessDocument', `${endpoint}/businessDocument/check`, args, options, fetch);
}
