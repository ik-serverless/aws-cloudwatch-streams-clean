# aws-cloudwatch-streams-clean

A small lambda to streamline some of the cleanup operations required when when working with AWS CloudWatch Log Stream, and especially when working with the old streams that costs us money.

## AWS Role

```json
{
  "Version": "2012-10-17",
  "Id": "KeepCostingLowRemoveAldCloudWatchStreams",
  "Statement": [
    {
      "Sid": "DescribeAndDelete",
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:DeleteLogStream",
        "logs:DescribeLogStreams"
      ],
      "Resource": [
        "arn:aws:logs:*:*:*"
      ]
    }
  ]
}
```