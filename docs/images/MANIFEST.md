# Bistro Delivery v2 — Screenshot Manifest

Inventory of every image placeholder in the v2 QA docs and the files that satisfy them.

- Placeholder sources: `docs/MANUAL.md` (current as of v1.1, 2026-06-10; all 12 images re-verified
  against the v1.1 capture specs on 2026-06-10, including the corrected bottom-left cart-icon
  position in SP-1/SS-2). `docs/AUTOMATED.md`
  contains no image placeholders. IMG-SP1/2/3 are additionally embedded in the QA Sphere seed data
  (`tms` repo, branch `codex/seed-bistro-shared-entities`,
  `apps/backend/services/seedexample/data_shared.go`) with specs identical to MANUAL.md §4.
- Local files live in `docs/images/`. The `.webp` siblings are the upload artifacts; S3 keys are
  under `s3://qasphere-example/bistro-v2/`.
- IMG-BD016.png was deleted: BD-016 no longer references any image (orphan from v1).

## Inventory

| IMG id    | Local file    | S3 key                   | Source placeholder location          | Status                           |
| --------- | ------------- | ------------------------ | ------------------------------------ | -------------------------------- |
| IMG-SP1   | IMG-SP1.png   | bistro-v2/IMG-SP1.webp   | MANUAL.md §4 SP-1 (+ data_shared.go) | verified, webp ready             |
| IMG-SP2   | IMG-SP2.png   | bistro-v2/IMG-SP2.webp   | MANUAL.md §4 SP-2 (+ data_shared.go) | verified, webp ready             |
| IMG-SP3   | IMG-SP3.png   | bistro-v2/IMG-SP3.webp   | MANUAL.md §4 SP-3 (+ data_shared.go) | verified, webp ready             |
| IMG-SS1   | IMG-SS1.png   | bistro-v2/IMG-SS1.webp   | MANUAL.md §5 SS-1                    | verified, webp ready             |
| IMG-SS2   | IMG-SS2.png   | bistro-v2/IMG-SS2.webp   | MANUAL.md §5 SS-2                    | verified, webp ready             |
| IMG-BD004 | IMG-BD004.png | bistro-v2/IMG-BD004.webp | MANUAL.md §6.1 BD-004                | verified, webp ready             |
| IMG-BD005 | IMG-BD005.png | bistro-v2/IMG-BD005.webp | MANUAL.md §6.1 BD-005                | retaken per new spec, webp ready |
| IMG-BD007 | IMG-BD007.png | bistro-v2/IMG-BD007.webp | MANUAL.md §6.2 BD-007                | verified, webp ready             |
| IMG-BD010 | IMG-BD010.png | bistro-v2/IMG-BD010.webp | MANUAL.md §6.2 BD-010                | verified, webp ready             |
| IMG-BD015 | IMG-BD015.png | bistro-v2/IMG-BD015.webp | MANUAL.md §6.3 BD-015                | verified, webp ready             |
| IMG-BD032 | IMG-BD032.png | bistro-v2/IMG-BD032.webp | MANUAL.md §6.7 BD-032                | verified, webp ready             |
| IMG-BD040 | IMG-BD040.png | bistro-v2/IMG-BD040.webp | MANUAL.md §6.8 BD-040                | verified, webp ready             |

Removed: `IMG-BD016.png` (orphaned — BD-016 in MANUAL.md §6.3 has no image placeholder in v2).

## Upload commands

Run from `docs/images/` once AWS credentials are available (uploads are NOT performed by the
capture workstream):

```sh
aws s3 cp IMG-SP1.webp   s3://qasphere-example/bistro-v2/IMG-SP1.webp   --content-type image/webp
aws s3 cp IMG-SP2.webp   s3://qasphere-example/bistro-v2/IMG-SP2.webp   --content-type image/webp
aws s3 cp IMG-SP3.webp   s3://qasphere-example/bistro-v2/IMG-SP3.webp   --content-type image/webp
aws s3 cp IMG-SS1.webp   s3://qasphere-example/bistro-v2/IMG-SS1.webp   --content-type image/webp
aws s3 cp IMG-SS2.webp   s3://qasphere-example/bistro-v2/IMG-SS2.webp   --content-type image/webp
aws s3 cp IMG-BD004.webp s3://qasphere-example/bistro-v2/IMG-BD004.webp --content-type image/webp
aws s3 cp IMG-BD005.webp s3://qasphere-example/bistro-v2/IMG-BD005.webp --content-type image/webp
aws s3 cp IMG-BD007.webp s3://qasphere-example/bistro-v2/IMG-BD007.webp --content-type image/webp
aws s3 cp IMG-BD010.webp s3://qasphere-example/bistro-v2/IMG-BD010.webp --content-type image/webp
aws s3 cp IMG-BD015.webp s3://qasphere-example/bistro-v2/IMG-BD015.webp --content-type image/webp
aws s3 cp IMG-BD032.webp s3://qasphere-example/bistro-v2/IMG-BD032.webp --content-type image/webp
aws s3 cp IMG-BD040.webp s3://qasphere-example/bistro-v2/IMG-BD040.webp --content-type image/webp
```
