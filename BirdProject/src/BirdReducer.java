import java.io.*;
import java.util.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;

/*
  The four template paramters are:
    Input Key - which is the state where sightings happened
    Input Value -which is the number of sightings
    Output Key - which is state
    Output Value - a collection of all the players
*/
public class BirdReducer extends Reducer<Text, Text, Text, Text>
{
  @Override
  public void reduce(Text key, Text values, Context context)
    throws IOException, InterruptedException
  {
    int totalSightings = 0;
    for (Text i : values)
    {
      totalSightings = totalSightings + Integer.parseInt(i.toString());
    }

    totalSightings.toString();
    context.write(key, totalSightings);
  }
}