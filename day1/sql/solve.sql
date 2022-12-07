with data as (
    select lag(weight) over (order by rn) = '' as start_of_new_elf, weight, rn
    from sandbox_db.DMITRITCHEBOTAREV.aoc2022day1input
),
     elf_data as (
         select *,
                sum(iff(start_of_new_elf, 1, 0))
                    over (order by rn rows between unbounded preceding and current row) as elf_number
         from data),
     elf_sums as (
         select elf_number, sum(nullif(weight, '')::number) as elf_sum
         from elf_data
         group by 1
     )
select elf_number, sum(elf_sum) over (order by elf_sum desc rows between unbounded preceding and current row)
from elf_sums
order by 2
