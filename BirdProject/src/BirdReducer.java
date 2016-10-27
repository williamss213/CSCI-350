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
public class BirdReducer extends Reducer<Text, Text, Text, IntWritable>
{
  @Override
  public void reduce(Text key, Iterable<Text> values, Context context)
    throws IOException, InterruptedException
  {
    List<Text> birdwatchers = new ArrayList<Text>();
    
    for (Text t : values)
    {
      if(!birdwatchers.contains(t))
      {
        birdwatchers.add(new Text(t));
      }
    }
    context.write(key, new IntWritable(birdwatchers.size()));
  }
}