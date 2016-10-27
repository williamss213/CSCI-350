import java.io.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.mapreduce.*;

/*
  The four template paramters are;    Input Key - which is a long integer offset
    Input Value - which is a line of text from the file
    Output Key - which is the state where the sightings happened
    Output Value - which is the total birds sighted
*/
public class BirdMapper extends Mapper<LongWritable, Text, Text, Text>
{
  @Override
  public void map(LongWritable key, Text value, Context context)
    throws IOException, InterruptedException
  {
    String line = value.toString();
    String tokens[] = line.split(",");
    String state = tokens[9];
    String observer_id = tokens[15];
    
    context.write(new Text(state), new Text(observer_id));
  }


}
