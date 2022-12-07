create or replace table sandbox_db.DMITRITCHEBOTAREV.aoc2022day1input as (
    select value as weight, "INDEX" as rn
    from
        table (split_to_table('
2000
-- removed inputs from git
2918
', '\n'
            ))
)
