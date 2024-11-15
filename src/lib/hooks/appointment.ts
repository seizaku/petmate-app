/* eslint-disable */
import type { Prisma, Appointment } from "@zenstackhq/runtime/models";
import type { UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { getHooksContext } from '@zenstackhq/tanstack-query/runtime-v5/react';
import { useModelQuery, useInfiniteModelQuery, useModelMutation } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { PickEnumerable, CheckSelect, QueryError, ExtraQueryOptions, ExtraMutationOptions } from '@zenstackhq/tanstack-query/runtime-v5';
import type { PolicyCrudKind } from '@zenstackhq/runtime'
import metadata from './__model_meta';
type DefaultError = QueryError;
import { useSuspenseModelQuery, useSuspenseInfiniteModelQuery } from '@zenstackhq/tanstack-query/runtime-v5/react';
import type { UseSuspenseQueryOptions, UseSuspenseInfiniteQueryOptions } from '@tanstack/react-query';

export function useCreateAppointment(options?: Omit<(UseMutationOptions<(Appointment | undefined), DefaultError, Prisma.AppointmentCreateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentCreateArgs, DefaultError, Appointment, true>('Appointment', 'POST', `${endpoint}/appointment/create`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentCreateArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentCreateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentCreateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useCreateManyAppointment(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.AppointmentCreateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentCreateManyArgs, DefaultError, Prisma.BatchPayload, false>('Appointment', 'POST', `${endpoint}/appointment/createMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentCreateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentCreateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentCreateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useFindManyAppointment<TArgs extends Prisma.AppointmentFindManyArgs, TQueryFnData = Array<Prisma.AppointmentGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindManyArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findMany`, args, options, fetch);
}

export function useInfiniteFindManyAppointment<TArgs extends Prisma.AppointmentFindManyArgs, TQueryFnData = Array<Prisma.AppointmentGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindManyArgs>, options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useInfiniteModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findMany`, args, options, fetch);
}

export function useSuspenseFindManyAppointment<TArgs extends Prisma.AppointmentFindManyArgs, TQueryFnData = Array<Prisma.AppointmentGetPayload<TArgs> & { $optimistic?: boolean }>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindManyArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findMany`, args, options, fetch);
}

export function useSuspenseInfiniteFindManyAppointment<TArgs extends Prisma.AppointmentFindManyArgs, TQueryFnData = Array<Prisma.AppointmentGetPayload<TArgs>>, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindManyArgs>, options?: Omit<UseSuspenseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TData>>, 'queryKey' | 'initialPageParam'>) {
    options = options ?? { getNextPageParam: () => null };
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseInfiniteModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findMany`, args, options, fetch);
}

export function useFindUniqueAppointment<TArgs extends Prisma.AppointmentFindUniqueArgs, TQueryFnData = Prisma.AppointmentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindUniqueArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findUnique`, args, options, fetch);
}

export function useSuspenseFindUniqueAppointment<TArgs extends Prisma.AppointmentFindUniqueArgs, TQueryFnData = Prisma.AppointmentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindUniqueArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findUnique`, args, options, fetch);
}

export function useFindFirstAppointment<TArgs extends Prisma.AppointmentFindFirstArgs, TQueryFnData = Prisma.AppointmentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindFirstArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findFirst`, args, options, fetch);
}

export function useSuspenseFindFirstAppointment<TArgs extends Prisma.AppointmentFindFirstArgs, TQueryFnData = Prisma.AppointmentGetPayload<TArgs> & { $optimistic?: boolean }, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentFindFirstArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/findFirst`, args, options, fetch);
}

export function useUpdateAppointment(options?: Omit<(UseMutationOptions<(Appointment | undefined), DefaultError, Prisma.AppointmentUpdateArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentUpdateArgs, DefaultError, Appointment, true>('Appointment', 'PUT', `${endpoint}/appointment/update`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentUpdateArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentUpdateArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentUpdateArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useUpdateManyAppointment(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.AppointmentUpdateManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentUpdateManyArgs, DefaultError, Prisma.BatchPayload, false>('Appointment', 'PUT', `${endpoint}/appointment/updateMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentUpdateManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentUpdateManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentUpdateManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useUpsertAppointment(options?: Omit<(UseMutationOptions<(Appointment | undefined), DefaultError, Prisma.AppointmentUpsertArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentUpsertArgs, DefaultError, Appointment, true>('Appointment', 'POST', `${endpoint}/appointment/upsert`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentUpsertArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentUpsertArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentUpsertArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteAppointment(options?: Omit<(UseMutationOptions<(Appointment | undefined), DefaultError, Prisma.AppointmentDeleteArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentDeleteArgs, DefaultError, Appointment, true>('Appointment', 'DELETE', `${endpoint}/appointment/delete`, metadata, options, fetch, true)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentDeleteArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentDeleteArgs>,
            options?: Omit<(UseMutationOptions<(CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined), DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentDeleteArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as (CheckSelect<T, Appointment, Prisma.AppointmentGetPayload<T>> | undefined);
        },
    };
    return mutation;
}

export function useDeleteManyAppointment(options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.AppointmentDeleteManyArgs> & ExtraMutationOptions), 'mutationFn'>) {
    const { endpoint, fetch } = getHooksContext();
    const _mutation =
        useModelMutation<Prisma.AppointmentDeleteManyArgs, DefaultError, Prisma.BatchPayload, false>('Appointment', 'DELETE', `${endpoint}/appointment/deleteMany`, metadata, options, fetch, false)
        ;
    const mutation = {
        ..._mutation,
        mutateAsync: async <T extends Prisma.AppointmentDeleteManyArgs>(
            args: Prisma.SelectSubset<T, Prisma.AppointmentDeleteManyArgs>,
            options?: Omit<(UseMutationOptions<Prisma.BatchPayload, DefaultError, Prisma.SelectSubset<T, Prisma.AppointmentDeleteManyArgs>> & ExtraMutationOptions), 'mutationFn'>
        ) => {
            return (await _mutation.mutateAsync(
                args,
                options as any
            )) as Prisma.BatchPayload;
        },
    };
    return mutation;
}

export function useAggregateAppointment<TArgs extends Prisma.AppointmentAggregateArgs, TQueryFnData = Prisma.GetAppointmentAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.AppointmentAggregateArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/aggregate`, args, options, fetch);
}

export function useSuspenseAggregateAppointment<TArgs extends Prisma.AppointmentAggregateArgs, TQueryFnData = Prisma.GetAppointmentAggregateType<TArgs>, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.AppointmentAggregateArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/aggregate`, args, options, fetch);
}

export function useGroupByAppointment<TArgs extends Prisma.AppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.AppointmentGroupByArgs['orderBy'] } : { orderBy?: Prisma.AppointmentGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.AppointmentGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.AppointmentGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.AppointmentGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.AppointmentGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.AppointmentGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/groupBy`, args, options, fetch);
}

export function useSuspenseGroupByAppointment<TArgs extends Prisma.AppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<TArgs>>, Prisma.Extends<'take', Prisma.Keys<TArgs>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.AppointmentGroupByArgs['orderBy'] } : { orderBy?: Prisma.AppointmentGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<TArgs['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<TArgs['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<TArgs['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends TArgs['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
    Array<PickEnumerable<Prisma.AppointmentGroupByOutputType, TArgs['by']> &
        {
            [P in ((keyof TArgs) & (keyof Prisma.AppointmentGroupByOutputType))]: P extends '_count'
            ? TArgs[P] extends boolean
            ? number
            : Prisma.GetScalarType<TArgs[P], Prisma.AppointmentGroupByOutputType[P]>
            : Prisma.GetScalarType<TArgs[P], Prisma.AppointmentGroupByOutputType[P]>
        }
    > : InputErrors, TData = TQueryFnData, TError = DefaultError>(args: Prisma.SelectSubset<TArgs, Prisma.SubsetIntersection<TArgs, Prisma.AppointmentGroupByArgs, OrderByArg> & InputErrors>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/groupBy`, args, options, fetch);
}

export function useCountAppointment<TArgs extends Prisma.AppointmentCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.AppointmentCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentCountArgs>, options?: (Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/count`, args, options, fetch);
}

export function useSuspenseCountAppointment<TArgs extends Prisma.AppointmentCountArgs, TQueryFnData = TArgs extends { select: any; } ? TArgs['select'] extends true ? number : Prisma.GetScalarType<TArgs['select'], Prisma.AppointmentCountAggregateOutputType> : number, TData = TQueryFnData, TError = DefaultError>(args?: Prisma.SelectSubset<TArgs, Prisma.AppointmentCountArgs>, options?: (Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useSuspenseModelQuery<TQueryFnData, TData, TError>('Appointment', `${endpoint}/appointment/count`, args, options, fetch);
}
import type { Status } from '@zenstackhq/runtime/models';

export function useCheckAppointment<TError = DefaultError>(args: { operation: PolicyCrudKind; where?: { id?: string; businessId?: string; status?: Status; userId?: string; petId?: number; totalPrice?: number; note?: string }; }, options?: (Omit<UseQueryOptions<boolean, TError, boolean>, 'queryKey'> & ExtraQueryOptions)) {
    const { endpoint, fetch } = getHooksContext();
    return useModelQuery<boolean, boolean, TError>('Appointment', `${endpoint}/appointment/check`, args, options, fetch);
}
