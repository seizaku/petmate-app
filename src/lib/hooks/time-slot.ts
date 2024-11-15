/* eslint-disable */
import type { Prisma, TimeSlot } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateTimeSlot(options?: Omit<(UseMutationOptions<(TimeSlot | undefined), DefaultError, Prisma.TimeSlotCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotCreateArgs, DefaultError, TimeSlot, true>('TimeSlot', 'POST', `${endpoint}/timeSlot/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyTimeSlot(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TimeSlotCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('TimeSlot', 'POST', `${endpoint}/timeSlot/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyTimeSlot<TArgs extends Prisma.TimeSlotFindManyArgs, TQueryFnData = Array<Prisma.TimeSlotGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findMany`, args, options, fetch);
}

export function useInfiniteFindManyTimeSlot<TArgs extends Prisma.TimeSlotFindManyArgs, TQueryFnData = Array<Prisma.TimeSlotGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findMany`, args, options, fetch);
}

export function useSuspenseFindManyTimeSlot<TArgs extends Prisma.TimeSlotFindManyArgs, TQueryFnData = Array<Prisma.TimeSlotGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyTimeSlot<TArgs extends Prisma.TimeSlotFindManyArgs, TQueryFnData = Array<Prisma.TimeSlotGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findMany`, args, options, fetch);
}

export function useFindUniqueTimeSlot<TArgs extends Prisma.TimeSlotFindUniqueArgs, TQueryFnData = Prisma.TimeSlotGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueTimeSlot<TArgs extends Prisma.TimeSlotFindUniqueArgs, TQueryFnData = Prisma.TimeSlotGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findUnique`, args, options, fetch);
}

export function useFindFirstTimeSlot<TArgs extends Prisma.TimeSlotFindFirstArgs, TQueryFnData = Prisma.TimeSlotGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstTimeSlot<TArgs extends Prisma.TimeSlotFindFirstArgs, TQueryFnData = Prisma.TimeSlotGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/findFirst`, args, options, fetch);
}

export function useUpdateTimeSlot(options?: Omit<(UseMutationOptions<(TimeSlot | undefined), DefaultError, Prisma.TimeSlotUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotUpdateArgs, DefaultError, TimeSlot, true>('TimeSlot', 'PUT', `${endpoint}/timeSlot/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyTimeSlot(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TimeSlotUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('TimeSlot', 'PUT', `${endpoint}/timeSlot/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertTimeSlot(options?: Omit<(UseMutationOptions<(TimeSlot | undefined), DefaultError, Prisma.TimeSlotUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotUpsertArgs, DefaultError, TimeSlot, true>('TimeSlot', 'POST', `${endpoint}/timeSlot/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteTimeSlot(options?: Omit<(UseMutationOptions<(TimeSlot | undefined), DefaultError, Prisma.TimeSlotDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotDeleteArgs, DefaultError, TimeSlot, true>('TimeSlot', 'DELETE', `${endpoint}/timeSlot/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, TimeSlot, Prisma.TimeSlotGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyTimeSlot(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.TimeSlotDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.TimeSlotDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('TimeSlot', 'DELETE', `${endpoint}/timeSlot/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.TimeSlotDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.TimeSlotDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.TimeSlotDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateTimeSlot<TArgs extends Prisma.TimeSlotAggregateArgs, TQueryFnData = Prisma.GetTimeSlotAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TimeSlotAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateTimeSlot<TArgs extends Prisma.TimeSlotAggregateArgs, TQueryFnData = Prisma.GetTimeSlotAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.TimeSlotAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/aggregate`, args, options, fetch);
}

export function useGroupByTimeSlot<TArgs extends Prisma.TimeSlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.TimeSlotGroupByArgs['orderBy'] } : { orderBy?: Prisma.TimeSlotGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.TimeSlotGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.TimeSlotGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.TimeSlotGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.TimeSlotGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.TimeSlotGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByTimeSlot<TArgs extends Prisma.TimeSlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.TimeSlotGroupByArgs['orderBy'] } : { orderBy?: Prisma.TimeSlotGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.TimeSlotGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.TimeSlotGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.TimeSlotGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.TimeSlotGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.TimeSlotGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/groupBy`, args, options, fetch);
}

export function useCountTimeSlot<TArgs extends Prisma.TimeSlotCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.TimeSlotCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/count`, args, options, fetch);
}

export function useSuspenseCountTimeSlot<TArgs extends Prisma.TimeSlotCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.TimeSlotCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.TimeSlotCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('TimeSlot', `${endpoint}/timeSlot/count`, args, options, fetch);
}

export function useCheckTimeSlot<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; time?: string; businessId?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('TimeSlot', `${endpoint}/timeSlot/check`, args, options, fetch);
}
